# Pseudocode for Frogfrogfrog

```
frog
    body
        x: 320 // Halfway across a 640x480 canvas
        y: 480 // Bottom of a 640x480 canvas
        size: 100 // Diameter of the frog circle
    tongue
        x: undefined // Will always match the body
        y: 480 // At the bottom (important to draw it BEHIND the frog)
        size: 20 // The tip of the tongue
        speed: 20 // Speed the tongue movies in pixels/second
        state: idle // At the start the tongue hasn't been launched

fly
    x: 0 // The left
    y: 200? // This will be a random position...
    size: 10 // Small?
    speed: 3 // How fast it moves across the screen

setup()
    Create a 640x480 canvas

draw()
    Draw the background // Probably just blue or something
    moveFly()
    drawFly()
    moveFrog()
    moveTongue()
    drawFrog()
    checkTongueFlyOverlap()

moveFly()
    add fly speed to fly x
    if (fly x is past the right side of the canvas)
        move the fly back to the left
        give the fly a random y position

drawFly()
    Draw a black circle at the fly's position with its size

moveFrog()
    Set the frog's x to the mouse x

moveTongue()
    Set tongue x to frog x
    if (tongue state is idle)
        Do nothing
    else if (tongue state is outbound)
        move the tongue up by its speed
        if (tongue hit the top)
            set the tongue state to inbound
    else if (tongue state is inbound)
        move the tongue down by its speed
        if (tongue hit the bottom)
            set the tongue state to idle

drawFrog()
    Draw a red circle at the tongue position with its size
    Draw a red line from the tongue position to the frog position
    Draw a green circle at the frog position with its size

checkTongueFlyOverlap()
    if (tongue circle overlaps the fly)
        Move the fly back to the left at a random y
        set the tongue state to inbound

mousePressed()
    if (tongue state is idle)
        set tongue state to outbound
```

# Pseudocode for Game

Notes, my plan is not pretty.

How the game will look
Menu
Play
Frog surrounded by assets or smthg idk

Press play

Tutorial/explanation
"You are a froggo decorating their bedroom. But life is expensive. You must pay for your decoration items with flies.
Collect flies by going outside. Then buy at the shop. Then decorate. Then click finish. This is a bad explanation. Have
fun."

My preference would be little pop-ups happen when you open up the game and no separate state for tutorial.

Choose Bedroom
Choose color palette

Game opens up.

Alternate between going outside and paying for things.
When you pay for things, different options for items appear. Option for color and design.
Then click done and item will appear. Then it will follow mouse until you place it within bounds.
If you want to remove, move to trash (you will be refunded)

When done, click finished and it will create a pdf for you.

Changes to frogfrogfrog

Make flies spawn faster
Make tongue catching more intuitive
Make swarms of flies appear at random times to catch multiple at once
Add counter
Have first fly have text following it saying "click mouse - catch fly"

# I really don't like writing pseudocode. I will text pseudocode.

```
class Decorations 
    
    string source image 
    string color 
    int cost
   
   constructor sets attributes and draw's image 
   
    function drawDecoration
        Loads image to mouse
    
    function followMouse
        When item is purchased, sprite will follow mouse until click
        When clicked, item will be placed at mouse position
        When clicked again, will "pick up" aka item will follow mouse again 
        Make sure when holding an item, nothing else can be accidentlly clicked (like shop) 
    
    function returnDecoration 
        When item is placed into the garbage (on the bottom right) the item will disappear and 
        the flies will be refunded 
     

class Shop 
    string source image (the image that will be displayed in the banner) 
    let Bannerbutton (the banner that will be pressed) 
    Decoration the decoration to be sold 
    
    function purchaseItem 
        On banner click, open submenu 
        Then click done
            This will instantiate a new Decoration object 
        Then subtract price from total flies 
        
    function openSubmenu 
        Draws a second, larger box underneath it which holds different options (two designs and 3 colors). These will set the decoration attributes
        If clicks on one image (button), source becomes x 
        Outline image 
        If clicks on one color (button), color becomes y 
        Outline color 
    
    function finishedOptions 
        If click on done button, instantiate new Decoration with attributes 

    
main 

int fliesOwned

function selectRoom
    Displays two images (buttons) and whichever you choose sets the background to that image in the game state
    
function chooseColor 
    Displays three color pallettes, and whichever you choose sets the color pallette for the background image 
    
funtion tutorial
    Creates a series of pop ups, each with a done button which will close the pop up 
    Pop ups should appear one at a time
    Store the pop ups in an array somehow
    Loop through all of them until done 
    Make everything else unclickable until then 
    
    
    
    
    

shop: 

container (white panel)
    item block 
        main image (variation 1)
        arrows pointing down
    sub block
        three variation images
        three buy buttons
        arrows pointing up 
    scroll wheel on the right 
        
conditions: 
all item blocks must be contained within the panel 
sub blocks must appear between a item block and the next one 
clicking the arrow pointing down reveals the sub block
clicking the arrow pointing up closes the sub block 
clicking buy places that item in the middle of the screen
    also deducts the cost of the fly from totalFlies 
                
    

















