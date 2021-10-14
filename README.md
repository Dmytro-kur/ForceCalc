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

Contact field describes friction between beam and support C. First column is a friction coefficient (as an assumption we use [dry friction](https://en.wikipedia.org/wiki/Friction) laws). "X coordinate" and “Y coordinate” columns define position (mm) of support C compared to coordinate origin marked as purple circle.

![image](force/static/force/pictures/Contact.png)

Plunger field describes interaction between beam and supports A & B. First column is a friction coefficient (dry friction laws assumption is also applied here). “Distance A” indicates distance between B & C (mm), while “Distance B” - distance between A & B (mm).

![image](force/static/force/pictures/Plunger.png)

Spring field describes linear spring characteristics (based on [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)). “Stiffness” column contains spring [stiffness](https://en.wikipedia.org/wiki/Stiffness) in (N/mm), “Free length” - the length of the spring when uncompressed, “Length” - the length of the compressed spring.

![image](force/static/force/pictures/Spring.png)

Angles field consists of the following:  “Direction of normal reaction force” is an orientation of smooth support, “Direction of plunger friction forces” and “Direction of normal reaction friction force” are directions where friction forces were applied. The relative motion of the beam occurs in the directions opposite to friction forces.

![image](force/static/force/pictures/Angles.png)

The usage of this software allows us to:
 1. Calculate normal reaction at the end of the beam (smooth support C) to avoid accumulating contact stress so that we could analyze robustness and reliability of a switch.
 2. Find a flexible solution based on versatility of tactile feelings that would satisfy the customer needs. 

To solve the issues mentioned above our beam is constantly being pushed by spring from the left end, reflecting the force to smooth support at the right end. This force creates haptic torque that could be felt while pushing or pulling the switch. Reactions applied from each support are depicted as arrows, with direction of force shown by arrowheads.

At the same time the beam doesn't move anywhere while we change it's position by hand being in a static balance that allows us to find unknown variables (forces):
 - _Ra_ - reaction on support A;
 - _Rb_ - reaction on support B;
 - _NR_ - normal reaction on support C.

![image](force/static/force/pictures/equations.png)

where _α0_ - direction of _Ra_, _α1_ - direction of _Rb_, _α2_ - direction of _NR_, _β0_ - direction of friction force in A support, _β1_ - direction of friction force in B support, _β2_ - direction of friction force in C support, _f_ - friction coefficient in A & B support, _μ_ - friction coefficient in C support, _a_ - length between A & B, _b_ - length between B & C, _LOAD_ - external load generated from a spring.









In `ForceApp` you can find [settings.py](ForceApp/settings.py) where LOGIN_URL is specified for appropriate path

[Contribution guidelines for this project](requirements.txt)


