### Leetcode 2753 (Hard): Count Houses in a Circular Street II [Practice](https://leetcode.com/problems/count-houses-in-a-circular-street-ii)

### Description  
You are standing on a circular street with n houses. Each house has a door which may be open or closed at the start, but at least one door is open. You cannot observe the number or positions of the houses directly. Instead, you are given access to the following methods for the current house:
- `isDoorOpen()`: returns if the door is open
- `closeDoor()`: closes the current door
- `moveRight()`: moves to the next house clockwise

Your goal is to determine how many houses are on the street (the value of n) by calling the available methods as needed. You may assume movement is always successful and the street is strictly circular (last to first wraps).

### Examples  

**Example 1:**  
Input: *API access as above; there are 4 houses*  
Output: `4`  
*Explanation:  
Suppose you start in front of house 0. You close its open door, move right, and repeat until you find the first closed door again, which is how you know you made a full circle and have counted all houses once.*

**Example 2:**  
Input: *API access as above; there are 1 house*  
Output: `1`  
*Explanation:  
You start at the only house, close its door, move right (returns to itself), find it is already closed, so count = 1.*

**Example 3:**  
Input: *API access as above; there are 3 houses (initial open doors at various positions)*  
Output: `3`  
*Explanation:  
No matter the starting open door, as you move right and close each open door, you count until you reach the first closed door, which signals a full loop. Total movement gives you the count of distinct houses.*

### Thought Process (as if you’re the interviewee)  
First, consider brute-force. Since you can only move clockwise and check doors, if you mark each unique house during traversal, you will eventually return to the starting house after fully circumnavigating the circle.  

A key insight is using the state of the door as a marker: by closing each open door as you go, you "mark" the house as visited. Once you land back at the first house (which will now be closed), you can detect a full loop. So:
- As long as you find an open door, close it and move right.
- Count each step until you find a closed door (which will be the starting point after making a full circle).
- The count is your answer.

This approach ensures no house gets counted twice and doesn't require extra memory.

A brute-force O(k²) idea (move k steps from each position and try all possibilities) is too slow. The optimized idea uses the guarantee of at least one open door and the circular property, marking and traversing each house exactly once.

### Corner cases to consider  
- Only one house (self-loop edge case).
- All doors initially closed except one (can still count correctly by the above method).
- Already start at the "last" house before wrapping.
- Maximum n = k (large input).
- More than one door is open at start (ensure correctness despite start position).

### Solution

```python
class CircularStreetCounter:
    def __init__(self, street):
        self.street = street

    def countHouses(self):
        count = 0

        # Close the open door at start to mark the start.
        self.street.closeDoor()
        count += 1

        # Move right and look for open doors, closing as you go.
        self.street.moveRight()

        # Repeat until you hit the closed door again (the starting point).
        while self.street.isDoorOpen():
            self.street.closeDoor()
            count += 1
            self.street.moveRight()

        return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each house is visited once, and each operation (close/check/move) is O(1). Total: n steps for n houses.

- **Space Complexity:** O(1).  
  Only a counter variable is used; no extra memory or recursion needed beyond API-internal state.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the API does not guarantee at least one open door?
  *Hint: Is there a way to mark a house uniquely or do you need extra storage?*

- What if you are allowed to move in both directions (left/right)?
  *Hint: Could this allow a different marking or counting scheme?*

- How would you implement this if all doors begin closed?
  *Hint: Would you need to use another property, or store visited houses differently?*

### Summary
This problem leverages the **"mark and traverse" pattern** in circular structures: mark each node (house) visited, then traverse until you hit a marker (closed door) indicating you made a full round. No extra storage is needed because the door's open/closed state works as the traversal mark. This is a useful and commonly seen approach in circular linked list problems, and is a specialized variation of the "tortoise and hare" or "cycle detection" approach, adapted for marker-based state.