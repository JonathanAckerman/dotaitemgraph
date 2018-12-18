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
		if(compare(input, gItemList[itemIter]) > 0)
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

function compare(lhs, rhs)
{
	left = lhs.toLowerCase();
	right = rhs.toLowerCase();
	
	var len = 0;
	if (left.length < right.length)
		len = left.length;
	else
		len = right.length;

	for (letterIter = 0; letterIter < len; ++letterIter)
	{
		if (left[letterIter] != right[letterIter])
        {
            if (left.length - (letterIter + 1) <= 2)
			    return letterIter;
        }
	}

	return len;
}
