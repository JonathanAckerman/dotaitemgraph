var gItemList = ["Blink Dagger", "Heart", "Hurricane Pike", "TP"];
var gHighlighted = [];

function getitems()
{
	var div_itemGrid = document.getElementById("items");
	div_itemGrid.style.gridRow = "auto / span " + gItemList.length;

    for (i = 0; i < gItemList.length; ++i)
    {
		var button = document.createElement("button");
		var node = document.createTextNode(gItemList[i]);
		button.appendChild(node);
		button.id = gItemList[i];
		div_itemGrid.appendChild(button);
	}
}

function highlightItem(input)
{
	var foundArray = [];

	for (itemIter = 0; itemIter < gItemList.length; ++itemIter)
	{
		if(JaroWinkler_Similarity(input, gItemList[itemIter]) > 0)
		{
			foundArray.push(gItemList[itemIter]);
		}
	}
	gHighlighted = foundArray;
	HighlightFoundItems();
}

function HighlightFoundItems()
{
	var div_itemGrid = document.getElementById("items");
	itemGrid = div_itemGrid.children;

	for (var j = 0; j < gItemList.length; ++j)
	{
		var it = itemGrid.namedItem(gItemList[j]);
		var foundIndex = gHighlighted.indexOf(gItemList[j]);
		if (foundIndex != -1)
			it.style.backgroundColor = "blue";
		else
			it.style.backgroundColor = "white";
	}
}

function JaroWinkler_Similarity(input, prototype)
{
    if (input.length == 0)
        return 0;
	left = input.toLowerCase();
	right = prototype.toLowerCase();
    
    var matchDist = Math.floor(Math.max(left.length, right.length) / 2) - 1;
    var numMatches = 0;
    var numFlips = 0;
    (leftMatches = []).length = left.length;
    leftMatches.fill(false);
    (rightMatches = []).length = right.length;
    rightMatches.fill(false);
    
    //there might be issues with duplicates in either string
	for (leftIter = 0; leftIter < left.length; ++leftIter)
	{
        for (rightIter = 0; rightIter < right.length; ++rightIter)
        {
            if (left[leftIter] == right[rightIter] && Math.abs(rightIter - leftIter) <= matchDist)
            {
                ++numMatches;
                leftMatches[leftIter] = true;
                rightMatches[rightIter] = true;
            }
        }
	}
    
    var j = 0;
    var t = 0;
    for (var i = 0; i < left.length; ++i)
    {
        if (leftMatches[i])
        {
            while (!rightMatches[j])
                ++j;
            if (left[i] != right[j])
                t += 0.5;
            ++j;
        }
    }
    
    var jaro = 0;
    if (numMatches > 0)
    {
        jaro = (1/3) * ((numMatches / left.length) + (numMatches / right.length) + ((numMatches - numFlips) / numMatches));
    }
    
    var prefixScale = 0.1; // 0.1 is the std
    var prefixLen = 2; // prefix is 0..4
    return jaro + (prefixLen * prefixScale * (1 - jaro));
}
