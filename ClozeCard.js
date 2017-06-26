function ClozeCard(text, cloze, function(err)) {
	
	if (err){
		console.log(err);
	}

	this.fullText = text;
	this.cloze = cloze;

	if (this.fullText.indexOf(this.cloze) == -1) {
		// throw error if the cloze deletion 
		// does not appear in the input fullText
		console.log("The cloze doesn't appear in your full text.");
	}
}

// take cloze out of text to create partial
ClozeCard.prototype.partial = this.fullText.replace(this.cloze,""); 

module.exports = ClozeCard;