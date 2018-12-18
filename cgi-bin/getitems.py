import dota2api

d2a = dota2api.Initialise()

dict = d2a.get_game_items()

for i in dict["items"]:
	print(i)
