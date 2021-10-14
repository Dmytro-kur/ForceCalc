# ForceCalc

This app allows to calculate unknown reactions of supports and moment vector of the beam that loaded from the left by spring and has a smooth support at the right.

Software could be used by automotive designers that produce car's switches especially on the design stage. Switches like power window switches

![image](force/static/force/pictures/Power-Windows.jpg)

or parking brake switch

![image](force/static/force/pictures/electric-handbrake.jpg)

ets.

This scheme reflects a simplified model of regular switches used inside cars.

![image](force/static/force/pictures/Switch2_(copy).jpg)
![image](force/static/force/pictures/Switch2_zoom.png)
![image](force/static/force/pictures/mechanical_scheme.png)

It is a mechanical scheme that consists of:

 - two journal bearings (A & B) with free movement along X axis;
 - smooth support C at the right end of the beam;
 - beam placed between supports A & C; 
 - spring that generate external linear load on the beam's left side.

In `ForceApp` you can find [settings.py](ForceApp/settings.py) where LOGIN_URL is specified for appropriate path


```
contact
plunger
spring
angles
```

[Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)
[Contribution guidelines for this project](requirements.txt)
![Linear equations.gif](force/static/force/pictures/Switch2_zoom.png)

- contact
- plunger
- spring
1. contact
   - first set
     - second set
3. plunger
4. spring
5. angles
 - [ ] Task 1. Calculate force
 - [x] Task 2. Calculate Torque #512
 - [ ] \(Optional) Build distances
Here is a simple footnote[^1].
<!-- This content will not appear in the rendered Markdown -->

[^1]: My reference.

@Dmytro-kur :+1: This PR looks great - it's ready to merge! :shipit:
