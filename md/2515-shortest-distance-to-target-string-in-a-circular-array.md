### Leetcode 2515 (Easy): Shortest Distance to Target String in a Circular Array [Practice](https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array)

### Description  
Given a list of strings `words` arranged in a circular fashion (the first and last elements are adjacent), and a start index `startIndex`, find the minimum number of steps needed to reach any occurrence of a target string `target`.  
You can move left or right (step is 1 in either direction). If the target does not exist, return -1.

### Examples  

**Example 1:**  
Input: `words = ["a", "b", "c", "d", "e"], target = "c", startIndex = 0`  
Output: `2`  
*Explanation: Starting at index 0 ("a"), minimum steps to "c" (either forward: 0→1→2 or backward: 0→4→3→2) is 2 steps.*

**Example 2:**  
Input: `words = ["hello","world","leetcode"], target = "hello", startIndex = 1`  
Output: `1`  
*Explanation: From index 1 ("world"), min steps: left to 0 ("hello") = 1, or right to 2→0 = 2. Return 1.*

**Example 3:**  
Input: `words = ["a", "b", "c"], target = "x", startIndex = 2`  
Output: `-1`  
*Explanation: "x" does not exist in the array, so the answer is -1.*

### Thought Process (as if you’re the interviewee)  
I’d start by considering all possible distances from `startIndex` to every index where `words[i] == target`, both clockwise and counterclockwise because it's a circular array.  
- For each index `i` where `words[i] == target`, compute the forward distance as `(i - startIndex) % n`, and backward (counterclockwise) distance as `(startIndex - i) % n` (where `n` is the length of `words`).  
- The minimum of these gives the minimal steps to reach the target.  
- If there are multiple instances of the target, take the smallest value over all.  
- If target is not in words, immediately return -1.

This is efficient since running through all possible indices is O(n), and we don’t use extra space except for a variable to track the answer.

### Corner cases to consider  
- `target` does not exist at all: return -1.
- `startIndex` points to target: output should be 0.
- Multiple targets exist, with different distances.
- Array of size 1, target not present.
- Array of size 1, target present.
- Circular wrap-around—closest target is by looping over.

### Solution

```python
def closetTarget(words, target, startIndex):
    n = len(words)
    min_steps = float('inf')  # Initialize as infinity

    # Check all positions for the target
    for i in range(n):
        if words[i] == target:
            # Calculate both distances due to the circular nature
            forward = (i - startIndex) % n
            backward = (startIndex - i) % n
            steps = min(forward, backward)
            if steps < min_steps:
                min_steps = steps

    # If min_steps was changed, target exists
    return min_steps if min_steps != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of words. We scan the entire list once.
- **Space Complexity:** O(1), as only a constant number of variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return all indices of minimum-distance targets, not just the distance?  
  *Hint: Collect both the step count and the index for every match, then filter those with minimal steps.*

- What if there are repeated queries for the same words array and different targets/startIndex?  
  *Hint: Can you preprocess all target positions or use a cache?*

- What if the movement cost was different in forward and backward direction?  
  *Hint: You’d need to parameterize cost and take minimum using the weighted sum.*

### Summary
The problem is a typical "distance in a circular array" type and is solved using modular arithmetic to handle wrap-around.  
This is a common coding pattern for circular problems and can be applied to scenarios like clock faces, rotatable arrays, and cyclic data structures. The brute force approach is already optimal at O(n), as you must potentially inspect every element.

### Tags
Array(#array), String(#string)

### Similar Problems
- Defuse the Bomb(defuse-the-bomb) (Easy)