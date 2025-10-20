### Leetcode 605 (Easy): Can Place Flowers [Practice](https://leetcode.com/problems/can-place-flowers)

### Description  
Given a **flowerbed** (an integer array) where `0` means an empty plot and `1` means a flower is planted, determine if you can plant **n** new flowers such that no two flowers are adjacent.  
You may not plant flowers in adjacent plots (i.e., no two `1`s next to each other). Return `True` if you can plant `n` new flowers without violating the rule.

### Examples  

**Example 1:**  
Input: `flowerbed=[1,0,0,0,1]`, `n=1`  
Output: `True`  
*Explanation: Only one flower needs to be planted. It can be planted at index 2: [1,0,1,0,1].*

**Example 2:**  
Input: `flowerbed=[1,0,0,0,1]`, `n=2`  
Output: `False`  
*Explanation: Trying to plant 2 flowers would require violating the no-adjacent-flowers rule.*

**Example 3:**  
Input: `flowerbed=[0,0,1,0,0]`, `n=2`  
Output: `True`  
*Explanation: Plant at index 0 ([1,0,1,0,0]) and index 4 ([1,0,1,0,1]).*

### Thought Process (as if you’re the interviewee)  
First thought is brute-force: For each empty spot, check if it's safe to plant (no 1's immediately left or right). If yes, plant and mark the spot, then move on.  
However, modifying the array in-place can be tricky for boundaries (start/end of array).

Optimized approach:
- Traverse the array. For each index, if it's a `0`, check:
  - The previous spot (if exists) is `0` or doesn't exist (start of array).
  - The next spot (if exists) is `0` or doesn't exist (end of array).
  - If both, plant a flower (`flowerbed[i]=1`) and increment a counter.
- If the counter reaches or exceeds `n`, return `True` early.
- At the end, if not enough flowers were planted, return `False`.

This solution only requires a single pass and basic checks for array bounds.  
Benefit: avoids extra space. Drawback: mutates input, but that's acceptable in most interview/LeetCode scenarios.

### Corner cases to consider  
- Empty array (`[]`), or `n==0` (should return `True`)
- No empty plots (`flowerbed` all 1's)
- One empty plot, `n>1` (cannot plant more than one)
- Repeated 0's at edges (can plant at the start or end)
- Cases with minimal space between 1's (e.g., `[0,1,0,1,0]`)
- All 0's (`[0,0,0,0,0]`) with various values of `n`

### Solution

```python
def canPlaceFlowers(flowerbed, n):
    count = 0
    length = len(flowerbed)
    
    for i in range(length):
        # Check if this plot is empty
        if flowerbed[i] == 0:
            # Check left neighbor (considering boundaries)
            empty_left = (i == 0) or (flowerbed[i - 1] == 0)
            # Check right neighbor (considering boundaries)
            empty_right = (i == length - 1) or (flowerbed[i + 1] == 0)
            
            if empty_left and empty_right:
                # Place a flower here
                flowerbed[i] = 1
                count += 1
                if count >= n:
                    return True
    return count >= n
```

### Time and Space complexity Analysis  

- **Time Complexity:** 𝑂(𝑛), where 𝑛 is the length of the flowerbed; we traverse the array once and only perform constant-time checks at each index.
- **Space Complexity:** 𝑂(1) extra space; we use a few variables. Although we mutate the input array, no extra space proportional to its size is needed.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if you cannot modify the input array?  
  *Hint: Use an extra copy or simulate placements with a counter only.*

- What if each flower needs at least two empty plots between them instead of one?  
  *Hint: Change the adjacency check; skip more than one slot ahead after planting.*

- How to maximize the number of new flowers you can plant in a given flowerbed?  
  *Hint: Greedily try to plant wherever valid, as in the given solution, count placements.*

### Summary
This problem is a classic *greedy placement* scenario, commonly seen in interval scheduling and array arrangement problems.  
The pattern can be applied anywhere you must choose positions under adjacency or spacing constraints.  
Key interview skills: array traversal, in-place modification, and careful boundary checking.


### Flashcard
For each 0, check if both neighbors (if any) are 0 or out of bounds; greedily plant and skip next spot to avoid adjacent flowers.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Teemo Attacking(teemo-attacking) (Easy)
- Asteroid Collision(asteroid-collision) (Medium)