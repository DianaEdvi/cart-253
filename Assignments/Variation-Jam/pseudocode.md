# Pseudocode for Variation Jam

I am bad at writing pseudocode

## BrainPong

The essential idea is to have a solo pong-style game where the user has to catch the ball on a paddle repeatedly.

The added catch is to have the user be doing some kind of mental game during it.

Variations:

Solo Pong (original): Just pong with one paddle, counter up until you lose

Math Pong: Math equations and you need to solve one equation per bounce of the ball (MCQ: right or left click to choose)

Color pong: Color word vs the color of the text (must choose the color of the text) and you need to solve one word per
bounce of the ball. Right or left click to choose the right answer

## Plan

```
Menu screen
    Title
    Three buttons (images?)
        Solo Pong
            Play Solo Pong 
        Math Pong
            Play Math Pong 
        Color Pong 
            Play Color Pong 
        ? for instructions 
            Pop up with instructions 
            Ok button to close 
        Note: I would prefer it my buttons were images that I drew abd that they get bigger when you hover over them with the mouse 
Solo Pong (Object)  
    Paddle 
        Image of a paddle 
        Moves horizontally based on mouse movement 
        Track Paddle's position and coordinates for collisions 
            Maybe an isCollided function? 
    Ball
        Ball drawing?
        Ball has velocity, angle, etc
        Falls off the screen if misses paddle
            Game over, reset game (1s wait, then resets automaticlaly)
        If hits paddle, increase counter  
    Counter 
        Counts the amt of times that the ball collides with the paddle 
    Menu Button 
        Returns to menu 
        Can also use esc 

Math Pong (extends Solo Pong) 
    Math 
        Simple math equations placed at the top of the screen 
        Answers are L/R 
        Click mouse left or right to answer 
Color Pong (extends Solo Pong) 
    Color  
        String of color name is displayed but the color of the text doesn't match 
        Click mouse L/R to answer 
        

Bonus idea: 
    Mix it up a bit by adding multipliers every like 30s or smthg 
    Where all you have to do is span the mouse L/R as much as you can before the ball drops 
    
Drawings required
    Paddle
    Ball
    Background
    Menu screen
    
    
