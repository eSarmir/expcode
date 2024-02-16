import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';
import { updateLanguageLevels } from './extensionState';

export function registerEvents(
	context: vscode.ExtensionContext,
	languageLevels: LanguageLevel[],
	treeViewDataRefreshCallback: () => void
	) {;
    registerOnDidChangeTextDocument(languageLevels);
	registerOnDidSaveTextDocument(
		context, 
		languageLevels, 
		treeViewDataRefreshCallback
	);
}

function registerOnDidChangeTextDocument(languageLevels: LanguageLevel[]) {
    vscode.workspace.onDidChangeTextDocument((event) => {
	
		let toUpdate = languageLevels.find(
			(languageLevel) => languageLevel.getLanguageId() === event.document.languageId);

		if (toUpdate === undefined) {
			toUpdate = new LanguageLevel(event.document.languageId);
			languageLevels.push(toUpdate);
		}
		
		toUpdate.gainExp(event.contentChanges.length);

		vscode.window.showInformationMessage(
            toUpdate!.stringify()
        );
	});
}

function registerOnDidSaveTextDocument(
	context: vscode.ExtensionContext, 
	languageLevels: LanguageLevel[],
	treeViewDataRefreshCallback: () => void) 
	{
	vscode.workspace.onDidSaveTextDocument((event) => {
	
		updateLanguageLevels(context, languageLevels);

		treeViewDataRefreshCallback();

		vscode.window.showInformationMessage(
			`Language levels saved`
        );
	});
}