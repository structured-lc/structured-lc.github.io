### Leetcode 1441 (Medium): Build an Array With Stack Operations [Practice](https://leetcode.com/problems/build-an-array-with-stack-operations)

### Description  
Given a strictly increasing target array of distinct integers from 1 to n (inclusive), simulate the process of building this array using a stack, starting from 1. You must:
- For each integer from 1 to n:
  - 'Push' the number onto the stack
  - If the number is in the target, keep it
  - If not, immediately 'Pop' it from the stack
Return the sequence of operations ('Push' and 'Pop') required to build the target array.

### Examples  

**Example 1:**  
Input: `target = [1,3], n = 3`  
Output: `["Push", "Push", "Pop", "Push"]`  
*Explanation: Push 1 (target), Push 2 (not target, pop), Push 3 (target)*

**Example 2:**  
Input: `target = [1,2,3], n = 3`  
Output: `["Push", "Push", "Push"]`
*Explanation: Each number 1 to 3 is in target; just Push all.*

**Example 3:**  
Input: `target = [2,3,4], n = 4`  
Output: `["Push", "Pop", "Push", "Push", "Push"]`  
*Explanation: Push 1 (not target, pop), Push 2 (target), Push 3 (target), Push 4 (target)*


### Thought Process (as if you’re the interviewee)  

We need to simulate the stack from 1 to n, always 'Push'ing numbers, and when a number is missing in the target, immediately 'Pop' it.

For each integer from 1 to the largest element in target:
- If the current number matches the next expected target element, Push (and move to the next target element)
- Otherwise, Push then Pop

We can stop early as soon as we've built the entire target.

### Corner cases to consider  
- Empty target array (edge input)
- Target containing all numbers up to n
- Target omits all but one number in range
- Target is just [n] (last item only)
- n is much larger than target's largest element

### Solution

```python
# Build an array by simulating stack operations

def buildArray(target, n):
    ops = []
    curr = 1
    i = 0
    while i < len(target):
        if curr == target[i]:
            ops.append("Push")
            i += 1
        else:
            ops.append("Push")
            ops.append("Pop")
        curr += 1
    return ops
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), but more precisely O(target[-1]); iterates from 1 to largest target.
- **Space Complexity:** O(len(target)), most extra storage is the operations array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can only use limited number of Pops?  
  *Hint: Can you construct targets with that limit?*

- What if you must minimize the number of operations?  
  *Hint: Can skipping numbers help, or must all be accounted for as per the rules?*

- How would your code change if the array wasn't strictly increasing?  
  *Hint: Is input promise needed for this stack simulation?*

### Summary
This solution follows a simple simulation or greedy pattern. For each integer up to the largest needed, simulate all operations that would happen, building the op list as required. This pattern can reappear in problems about simulating abstract data structure operations (like stacks, queues, or buffers).