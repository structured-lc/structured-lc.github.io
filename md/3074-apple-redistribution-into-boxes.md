### Leetcode 3074 (Easy): Apple Redistribution into Boxes [Practice](https://leetcode.com/problems/apple-redistribution-into-boxes)

### Description  
You are given two integer arrays:  
- **apple**, where apple[i] is the number of apples in the iᵗʰ pack  
- **capacity**, where capacity[j] is the capacity (number of apples it can hold) in the jᵗʰ box

You can split apples from any pack between multiple boxes. Your task is to find the **minimum number of boxes** you need to select to redistribute all apples from the packs, so that every apple is in some box (no need to use all boxes).  
Think of it as: Given the total number of apples, what's the least number of boxes whose capacities sum up to at least that total?

### Examples  

**Example 1:**  
Input: `apple = [1,3,2], capacity = [4,3,1,5,2]`  
Output: `2`  
*Explanation: Total apples = 1+3+2 = 6. The two largest boxes have capacities 5 and 4. Using both, total capacity = 9 ≥ 6. Thus, minimum boxes = 2.*

**Example 2:**  
Input: `apple = [5,5,5], capacity = [2,4,2,7]`  
Output: `4`  
*Explanation: Total apples = 15. All box capacities: [7,4,2,2]. Using all (7+4+2+2=15), so minimum boxes = 4. None can be omitted.*

**Example 3:**  
Input: `apple = [4], capacity = [2,2,2,2]`  
Output: `2`  
*Explanation: Total apples = 4. Each box can hold 2 apples. Need at least two boxes: 2+2=4. Any fewer is insufficient.*

### Thought Process (as if you’re the interviewee)  
Start by noting:
- The apples can be split from packs arbitrarily; pack boundaries don’t matter for distribution.
- The problem boils down to: **Given an integer total, pick the smallest set of box capacities whose sum ≥ total.**

**Brute-force approach:**  
- Try all possible combinations of boxes, and find the smallest combination where capacity sum ≥ total_apples.
- This is exponential; with up to 50 boxes, not practical.

**Optimized approach:**  
- Since we need the *minimal* number of boxes, using bigger boxes is beneficial.
- Sort capacities in descending order.
- Iterate, accumulating capacities from largest to smallest, until sum ≥ total_apples.
- The number of boxes chosen in this greedy approach is the answer.
- Why is greedy optimal here? Because adding the biggest available box reduces the number required most rapidly. There are no constraints to force you to "weigh" using a smaller box.

**Space/time tradeoff:**  
- Time: O(m log m) due to sorting, then O(m) to accumulate, where m = number of boxes.
- Space: Just O(1) extra, since we're only storing counters.

### Corner cases to consider  
- apple array or capacity array has length 1 (minimal size)
- All boxes have capacity 1 (tests the simple case where you must use many boxes)
- Some boxes just big enough, excess in smallest last box (e.g. total apples 10, boxes [10,9,8])
- All boxes capacity < any apple pack (irrelevant, as apples can split, but worth thinking through)
- Large numbers, e.g. apples sum to 50, boxes [49,1,1,...] etc.
- Repeated capacities

### Solution

```python
def minimumBoxes(apple, capacity):
    # Find how many apples we must place
    total_apples = sum(apple)
    
    # Sort capacities descending (biggest to smallest)
    capacity.sort(reverse=True)
    
    boxes_used = 0
    box_sum = 0
    
    # Greedily select largest available boxes until sum ≥ total_apples
    for cap in capacity:
        box_sum += cap
        boxes_used += 1
        if box_sum >= total_apples:
            return boxes_used
    
    # Problem guarantees input has enough capacity, so we shouldn't reach here
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m log m), where m = number of boxes. The most expensive step is sorting the capacity array.
- **Space Complexity:** O(1) extra space (not counting input arrays), since only a few variables are used. Sorting is usually done in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose boxes have a fixed cost, and you want to minimize total cost instead of number of boxes?  
  *Hint: Each box now has a cost — try a greedy similar to the "minimum cost" variant of the knapsack/covering problem.*

- What if some boxes have a maximum "number of packs" limit (not just total apples)?  
  *Hint: You have to respect which packs can go into which boxes, so mapping is more complex—think bipartite matching or allocation.*

- Can you return which boxes to use, not just the number?  
  *Hint: Track box indices during sorting/selection.*

### Summary
This problem uses a common *greedy covering* pattern: to minimize the number of containers needed to reach a total, iteratively choose the biggest available options. The same approach applies to bin packing, picking coins for change, or scheduling with deadlines. It's optimal here since apples can be split freely; otherwise, variants may need dynamic programming (e.g. for indivisible items or costs). Greedy selection based on size/capacity/efficiency is a key tactic in many real-world packing and covering problems.