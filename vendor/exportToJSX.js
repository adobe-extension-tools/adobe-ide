/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const path = require('path');
const fs = require('fs');

const thisScript = path.basename(__filename);
var force = false;
var scriptOrDirPath = undefined;

function GetESDInterface(){
	const platform = `${process.platform}`;
	const platformArch = `${process.arch}`;
	var esdinterface = undefined;
	if(platform == "darwin")
		esdinterface = require("@esdebug/esdebugger-core/mac/esdcorelibinterface.node");
	else if(platform == "win32") {
		if(platformArch == "x64" || platformArch == "arm64")
			esdinterface = require("@esdebug/esdebugger-core/win/x64/esdcorelibinterface.node");
		else
			esdinterface = require("@esdebug/esdebugger-core/win/win32/esdcorelibinterface.node");
	}
    if(esdinterface === undefined) {
        console.log("Platform not supported: " + platform);
        process.exit(1);
    }
	return esdinterface;
}

function printUsage() {
    const platform = `${process.platform}`;
    if(platform == "win32") {
        console.log("\nUsage: electron %s [options] [filename/directory]\n", thisScript);
        console.log("NOTE: electron 2.0.12 should be installed. Run: <npm install -g electron@2.0.12> to install.\n");
    } else {
        console.log("\nUsage: node %s [options] [filename/directory]\n", thisScript);
    }
    
    console.log("Description: Export the provided file or files in the provided directory to jsxbin.");
    console.log("             The files are saved in the same directory with same names(but with .jsxbin extension) as file names.");
    console.log("             The directory will be traversed recursively.\n");
    console.log("Options:");
    console.log("-f, --force        Overwrite the '.jsxbin' file/files if already exists.");
    console.log("-n, --name         The '.js/.jsx' script path or path to some directory having these files.");
    console.log("-h, --help         Show this help and exit.\n");
    process.exit(0);
}

function fetchLastErrorAndExit() {
    var errorInfo = undefined;
    var error = GetESDInterface().esdGetLastError();
    if(error.status != 0){
        if(error.data) {
            errorInfo = error.data;
        }
    }
    if(errorInfo !== undefined) {
        console.log("Unable to proceed. Error Info: " + errorInfo);
    }
    process.exit(1);
}

function init() {
    var initData = GetESDInterface().esdInit();

    if(initData.status !== 0) {
        console.log("Unable to proceed. Error Code: " + initData.status);
        fetchLastErrorAndExit();
    }
}
function destroy() {
    GetESDInterface().esdDestroy();
}

function processCommandLineArgs() {
    const args = process.argv;
    if(args.length < 3 || args.length > 5) {
        console.log("Invalid number of arguments");
        printUsage();
        process.exit(1);
    }

    for (var idx = 2; idx < args.length; idx++) {
        switch(args[idx]) {
            case "-f":
            case "--force":
                force = true;
                break;
            
            case "-n":
            case "--name":
                if( idx < args.length - 1 ) {
                    scriptOrDirPath = args[++idx];
                } else {
                    printUsage();
                }
                break;
            
            case "-h":
            case "--help":
            default:
                printUsage();
        }
    }
}

function readFileSyncNoBOM(scriptPath) {
	var content = undefined;
	try {
		content = fs.readFileSync(scriptPath).toString();
		//Remove BOM characters. BOM characters are generally present
		//at the starting of UTF-8 encoded files coming from Windows Platform.
		if(content) {
			content = content.replace(/^\uFEFF/, '');
		}
	} catch (error) {
		console.log(error);
	}

	return content;
}


function writeToFile(filePath, text){
	try {
	    if(fs.existsSync(filePath)){
            if (force === true) {
                fs.writeFileSync(filePath, text);
                console.log("Success: " + filePath);
            }
		} else {
            fs.writeFileSync(filePath, text);
            console.log("Success: " + filePath);
		}
	} catch(error) {
		console.log(error);
	}
}

function exportFileToJSX(scriptPath) {
    var extName = path.extname(scriptPath);
    extName = extName.toLowerCase();

    if(extName !== ".jsx" && extName !== ".js" ) {
        console.log("File Extenison should be .jsx/.js: Not exporting: " + scriptPath);
        return;
    }

    var compiledSource = "";
    var includePath = path.dirname(scriptPath);
    var scriptSource = readFileSyncNoBOM(scriptPath);
    var scriptDirectory = includePath;

    var apiData = GetESDInterface().esdCompileToJSXBin(scriptSource, scriptPath, includePath);
    if(apiData.status != 0){
        console.log("Unable to proceed. Error Code: " + apiData.status);
        fetchLastErrorAndExit();
    } else {
        compiledSource = apiData.data;
    }

    var scriptName = path.basename(scriptPath);
    var saveScriptName = path.basename(scriptName, path.extname(scriptName));
    saveScriptName += ".jsxbin";
    var saveScriptPath = path.join(scriptDirectory, saveScriptName);
    
    writeToFile(saveScriptPath, compiledSource);
}

function exportDirectoryFilesToJSX(dirPath) {
    try {
        var filesList = fs.readdirSync(dirPath); 
        filesList.forEach(function(file) {
            file = path.resolve(dirPath, file);
            var stat = fs.statSync(file); 
            if (stat) {
                if(stat.isDirectory()) {
                    exportDirectoryFilesToJSX(file);
                } else if(stat.isFile()) {
                    exportFileToJSX(file);
                }
            }
        });
    } catch(error) {
        console.log(error);
    }
}

function startExport() {
    try {
        var scPath = path.resolve(scriptOrDirPath);
        var stats = fs.statSync(scPath);
        if(stats.isFile()) {
            exportFileToJSX(scPath);
        } else if (stats.isDirectory()) {
            exportDirectoryFilesToJSX(scPath);
        } else {
            console.log("%s is neither file or directory", scriptOrDirPath);
            process.exit(1);
        }
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
    process.exit(0);
}

processCommandLineArgs();
init();
startExport();
destroy();
