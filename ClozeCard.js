function ClozeCard(text, cloze) {

	this.fullText = text;
	this.cloze = cloze;
	// take cloze out of text to create partial
	this.partial = (this.fullText).replace((this.cloze),""); 

	if (this.fullText.indexOf(this.cloze) == -1) {
		// throw error if the cloze deletion 
		// does not appear in the input fullText
		console.log("The cloze doesn't appear in your full text.");
	}
}

module.exports = ClozeCard;