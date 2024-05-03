import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';
import { updateLanguageLevels } from './extensionState';
import { showLanguageLevelUpNotification } from './notifications';
import { ExperienceCalculator } from './experienceCalculator';
import { TextDocumentChange } from './textDocumentChange';
import { LanguageLevels } from './languageLevels';

export function registerEvents(
	context: vscode.ExtensionContext,
	languageLevels: LanguageLevels,
	experienceCalculator: ExperienceCalculator,
	treeViewDataRefreshCallback: () => void) {

	registerOnDidChangeTextDocument(	
		languageLevels,
		experienceCalculator);

	registerOnDidSaveTextDocument(
		context, 
		languageLevels, 
		treeViewDataRefreshCallback
	);
}

function registerOnDidChangeTextDocument(
	languageLevels: LanguageLevels,
	experienceCalculator: ExperienceCalculator) {

    vscode.workspace.onDidChangeTextDocument((event) => {
	
		let toUpdate = languageLevels.getLanguageLevel(event.document.languageId);

		if (toUpdate === undefined) {
			toUpdate = new LanguageLevel(event.document.languageId);
			languageLevels.addLanguageLevel(toUpdate);
		}

		const documentChange: TextDocumentChange = {
			text: event.contentChanges[0].text,
			receivedAt: Date.now()
		};

		var experienceToGain = experienceCalculator.calculate(documentChange);

		var hasLeveledUp = toUpdate.gainExp(experienceToGain);
		languageLevels.getLanguageLevel('overall')!.gainExp(experienceToGain);

		if (hasLeveledUp) {
			showLanguageLevelUpNotification(toUpdate);
		}
	});
}

function registerOnDidSaveTextDocument(
	context: vscode.ExtensionContext, 
	languageLevels: LanguageLevels,
	treeViewDataRefreshCallback: () => void) {
		
	vscode.workspace.onDidSaveTextDocument(() => {
	
		updateLanguageLevels(context, languageLevels);

		treeViewDataRefreshCallback();
	});
}