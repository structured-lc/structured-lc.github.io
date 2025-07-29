### Leetcode 2728 (Easy): Count Houses in a Circular Street [Practice](https://leetcode.com/problems/count-houses-in-a-circular-street)

### Description  
You are given access to a Street object representing a circular street of unknown length (≤ k). There is a house at each position, and each house has a door that can be open or closed. You don’t know where you start on the street.  
Your task is to count the total number of houses on this circular street.  
You have the following methods available:
- `isDoorOpen()`: Check if the door at your current house is open.
- `openDoor()`: Open the door at your current house.
- `closeDoor()`: Close the door at your current house.
- `moveRight()`: Move to the house to the right (wrapping around the circle).
- `moveLeft()`: Move to the house to the left.

You know the maximum possible houses (k), but not the actual count.    
Your goal: Return the total number of houses on the street.

### Examples  

**Example 1:**  
Input: Street with 4 houses, k = 10  
Output: `4`  
*Explanation: Start at any house; traverse the houses, marking each by closing/opening the door; after making a full circle, you identify the circle length is 4.*

**Example 2:**  
Input: Street with 6 houses, k = 8  
Output: `6`  
*Explanation: You use the door state to mark visited houses and after walking k+1 times, you find that you returned to your start after 6 steps.*

**Example 3:**  
Input: Street with 1 house, k = 1  
Output: `1`  
*Explanation: Since only one house exists, you’ll keep coming back to the same position instantly.*

### Thought Process (as if you’re the interviewee)  
First, since the street is circular and the length is unknown, we need a way to detect when we've completed a full traversal and returned to our starting point.  
We can't use extra memory or set data structures, but we can use each house's door as a marker. The idea is:
- Mark the starting house (e.g., by closing its door).
- Move right, for up to k steps. At each position, mark the door (close/open).
- If we return to the initially marked house (which becomes identifiable by its distinct door state), we’ve walked the whole circle.
- Count the steps until you loop back to your marker, which gives the total house count.

This avoids infinite loops and makes use of the only available (safe & reversible) “state” per house.  
The optimized approach is simple linear simulation using the marking trick with house doors.

### Corner cases to consider  
- Only one house (single-node loop).
- All doors initially closed or open.
- We start at any arbitrary house, not necessarily house 0.
- k much larger than n (the real house count).
- Odd/even number of houses.
- If a door cycles back before k steps, ensure you properly terminate.

### Solution

```python
# Assume the Street class is provided with the required methods.
# We'll use closeDoor() to mark visited houses as we traverse.

def countHouses(street, k):
    # Step 1: At the starting house, check the door state.
    start_state = street.isDoorOpen()
    # Mark the starting house's door, so we can identify when we come back.
    street.closeDoor()
    
    count = 1  # Already marked the starting house.
    
    # Walk around the circle, marking each house for up to k steps.
    for step in range(1, k + 1):
        street.moveRight()
        if not street.isDoorOpen():
            # We've come back to a house we've marked (the start).
            break
        # Mark the door to ensure the house is visited.
        street.closeDoor()
        count += 1

    # Optionally, restore the original state for cleanliness (not required unless specified).
    # Go back to start and set its door to its original state.
    for _ in range(count - 1):
        street.moveLeft()
    if start_state:
        street.openDoor()
    else:
        street.closeDoor()
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k)  
  We may need to move and mark up to k houses in the worst case, but the street has at most k houses. Each move, door operation, and state check is O(1).
- **Space Complexity:** O(1)  
  No extra memory is used except a few variables. Door state is used as our visitation marker.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if **houses did not have doors** (no per-house state)?
  *Hint: Is there any way to uniquely identify each house if you can't mark them temporarily?*

- What if **the street was not circular but linear (ends do not connect)?**
  *Hint: Is there a natural stopping point as you walk down the street?*

- Can you optimize for **concurrent access** if multiple people count at once?
  *Hint: Would door state consistency break if two counters change the states?*

### Summary
This problem is a classic example of “marking visited nodes with available local state” and is related to cycle detection in a circular data structure.  
The pattern is frequently seen where you must detect rounds or cycles in doubly-linked lists, circular buffers, or robots moving on a circular path with limited local memory.