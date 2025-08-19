### Leetcode 755 (Medium): Pour Water [Practice](https://leetcode.com/problems/pour-water)

### Description  
Given a 1D array representing the **heights** of a terrain, you are given a certain number of **water droplets (volume)** and a **drop position (k)**. For each droplet, simulate how the water falls:  
- Each droplet starts at position `k`.
- It first tries to **go left** as far as possible, but only to a spot where each next position is not higher and strictly lower if possible.
- If it can't move left to a lower position, it tries to **go right** in a similar way.
- If the droplet can't move left or right to a lower position, it stays at its current position.
- The simulation repeats for all droplets.
- After all droplets are poured, return the final **heights** array.

### Examples  

**Example 1:**  
Input: `heights = [2,1,1,2,1,2,2], volume = 4, k = 3`  
Output: `[2,2,2,3,2,2,2]`  
*Explanation: For each droplet:  
1. Droplet 1: Moves left to index 1 (height 1), makes it 2.  
2. Droplet 2: Moves left, index 2 (height 1, now lowest), makes it 2.  
3. Droplet 3: Can't go left (heights equal), so it settles at index 3, makes it 3.  
4. Droplet 4: Goes left, can't go further, then right, finds index 4 (height 1), makes it 2.*

**Example 2:**  
Input: `heights = [1,2,3,4], volume = 2, k = 2`  
Output: `[2,3,3,4]`  
*Explanation:  
1. Droplet 1: Moves left to index 0, fills index 0 (now 2).  
2. Droplet 2: Moves left, can't go further (heights now [2,2,3,4]), fills index 1 (now 3).*

**Example 3:**  
Input: `heights = [3,1,3], volume = 5, k = 1`  
Output: `[4,4,4]`  
*Explanation:  
- All droplets stack at index 1 (height 1), making it 4, then others pile at both ends.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify:
- For each droplet, it always tries the **left** first, then **right**, and only stays if there’s no lower left or right position.
- Water fills the **lowest** reachable location preferencing left.

A brute-force idea:
- For each droplet: iterate left to find the lowest spot, then right if left fails, then fill at k.
- For each direction, always make sure only to move if the next spot is **lower** (not the same or higher).

Optimizing:
- Simulation is nearly required as terrain may change after every pour, so each droplet’s path could be different.
- Each droplet may require traversing the entire array left/right in the worst-case.

Final approach:
- For volume v: for each droplet,
  - Start at k, scan left, keep track of lowest position.
  - If not found, scan right.
  - If not, fill at k.
  - At each pour, update heights.

Trade-offs:
- Readability: Simulation is clear.
- Performance: Each droplet may traverse up to n, so O(n × v). Usually acceptable unless v, n are huge.

### Corner cases to consider  
- volume = 0; should return original heights.
- heights is empty.
- All heights equal; droplets stay at k.
- k at an edge; droplets can only go one way.
- Droplets causing overflows at array ends.
- Left and right sides are equally low; should prefer left.

### Solution

```python
def pour_water(heights, volume, k):
    n = len(heights)
    for _ in range(volume):
        pos = k
        # Try go left
        best = k
        curr = k
        while curr > 0 and heights[curr - 1] <= heights[curr]:
            if heights[curr - 1] < heights[best]:
                best = curr - 1
            curr -= 1
        if best != k:
            heights[best] += 1
            continue
        # Try go right
        best = k
        curr = k
        while curr < n - 1 and heights[curr + 1] <= heights[curr]:
            if heights[curr + 1] < heights[best]:
                best = curr + 1
            curr += 1
        if best != k:
            heights[best] += 1
            continue
        # Stay at k
        heights[k] += 1
    return heights
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(volume × n); for each droplet, we may scan up to n positions left and right.
- **Space Complexity:** O(1) extra; modifies heights in place, uses only a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the terrain is 2D, not just 1D?  
  *Hint: Think about how to simulate spreading in four directions.*

- How would you optimize if you regularly pour water at the same position for a very large volume?  
  *Hint: Can you amortize search by storing last-known local minima?*

- Can you design an O(1) solution for answering the resulting heights after each drop?  
  *Hint: Consider monotonic stacks or segment trees – is precomputation possible in 1D?*

### Summary
This is a classic **simulation** problem, emphasizing careful step-by-step modeling of the scenario.
It uses the "left-first, then right, else settle" rule resembling greedy pathfinding.
Techniques in the solution, especially the scanning for the lowest neighbor, are applicable to similar water-filling, rain-water trapping, or gravity-based simulation questions.

### Tags
Array(#array), Simulation(#simulation)

### Similar Problems
- Trapping Rain Water(trapping-rain-water) (Hard)