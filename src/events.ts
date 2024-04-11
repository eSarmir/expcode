import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';
import { updateLanguageLevels } from './extensionState';
import { showGainedExperienceDebugNotification, showLanguageLevelUpNotification } from './notifications';
import { ExperienceCalculator } from './experienceCalculator';
import { TextDocumentChange } from './textDocumentChange';

export function registerEvents(
	context: vscode.ExtensionContext,
	languageLevels: LanguageLevel[],
	experienceCalculator: ExperienceCalculator,
	treeViewDataRefreshCallback: () => void
	) {
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
	languageLevels: LanguageLevel[],
	experienceCalculator: ExperienceCalculator) {

    vscode.workspace.onDidChangeTextDocument((event) => {
	
		let toUpdate = languageLevels.find(
			(languageLevel) => languageLevel.getLanguageId() === event.document.languageId);

		if (toUpdate === undefined) {
			toUpdate = new LanguageLevel(event.document.languageId);
			languageLevels.push(toUpdate);
		}

		const documentChange: TextDocumentChange = {
			text: event.contentChanges[0].text,
			receivedAt: Date.now()
		};

		var experienceToGain = experienceCalculator.calculate(documentChange);

		var hasLeveledUp = toUpdate.gainExp(experienceToGain);

		if (hasLeveledUp) {
			showLanguageLevelUpNotification(toUpdate);
		}
	});
}

function registerOnDidSaveTextDocument(
	context: vscode.ExtensionContext, 
	languageLevels: LanguageLevel[],
	treeViewDataRefreshCallback: () => void) {
		
	vscode.workspace.onDidSaveTextDocument(() => {
	
		updateLanguageLevels(context, languageLevels);

		treeViewDataRefreshCallback();
	});
}