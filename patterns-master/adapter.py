# Adaptee
class GameConsole:
    # Function to adapt
    def create_game_picture(self):
        return 'picture from console'

# Adaptee
class Antenna:
    # Function to adapt
    def create_wave_picture(self):
        return 'picture from wave'

# Adapter
class SourceGameConsole(GameConsole):
    def get_picture(self):
        return self.create_game_picture()

# Adapter
class SourceAntenna(Antenna):
    def get_picture(self):
        return self.create_wave_picture()
# Consumer
class TV:
    def __init__(self, source):
        self.source = source
    def show_picture(self):
        return self.source.get_picture()

g = SourceGameConsole()
a = SourceAntenna()
game_tv = TV(g)
cabel_tv = TV(a)
print(game_tv.show_picture())
print(cabel_tv.show_picture())
