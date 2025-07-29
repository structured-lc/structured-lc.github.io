### Leetcode 1710 (Easy): Maximum Units on a Truck [Practice](https://leetcode.com/problems/maximum-units-on-a-truck)

### Description  
Given several types of boxes, each described by `[numberOfBoxes, unitsPerBox]`, and an integer `truckSize` representing the truck’s capacity (in boxes, not units), your task is to maximize the total number of *units* loaded onto the truck.  
You can take boxes of any type, but the truck cannot hold more than `truckSize` boxes in total.  
Find out the maximum total units you can carry.

### Examples  

**Example 1:**  
Input: `boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4`  
Output: `8`  
*Explanation: Take 1 box of type [1,3] (1×3=3 units), 2 boxes of type [2,2] (2×2=4 units), and 1 box of type [3,1] (1×1=1 unit). Total = 3+4+1 = 8 units.*

**Example 2:**  
Input: `boxTypes = [[5,10],[2,5],[4,7],[3,9]], truckSize = 10`  
Output: `91`  
*Explanation: Sort by units per box: [5,10], [3,9], [4,7], [2,5]. Take all 5 of [5,10] (50), all 3 of [3,9] (27), and 2 of [4,7] (14), totaling 91 units.*

**Example 3:**  
Input: `boxTypes = [[1,5]], truckSize = 1`  
Output: `5`  
*Explanation: Only 1 box fits; it yields 5 units.*

### Thought Process (as if you’re the interviewee)  
- First, we want to maximize units, so we should prioritize box types with the most units per box.
- A brute-force approach would consider every possible combination, but that is too slow for larger inputs.
- Instead, **greedy** strategy: always take as many as possible from the box type with the highest units, until the truck is full or we run out of that type.
- Sort `boxTypes` by `unitsPerBox` descending, iterate through, each time choosing `min(truckSize, numberOfBoxes)` from this type, update the answer, and decrease `truckSize` accordingly.
- This approach is efficient and guarantees optimality because, at every step, we make the locally optimal choice by selecting the most valuable available boxes first.

### Corner cases to consider  
- `boxTypes` has only one entry.
- `truckSize` is less than the number of boxes in the first (most valuable) boxType.
- `boxTypes` is empty.
- The sum of all boxes is ≤ `truckSize` (just take everything).
- All boxTypes have the same `unitsPerBox`.
- `numberOfBoxes` or `unitsPerBox` is zero for any boxType.

### Solution

```python
def maximumUnits(boxTypes, truckSize):
    # Sort the boxTypes by unitsPerBox in descending order
    boxTypes.sort(key=lambda x: x[1], reverse=True)
    
    total_units = 0
    for num_boxes, units_per_box in boxTypes:
        # Determine the number of boxes we can take from this box type
        take = min(truckSize, num_boxes)
        total_units += take * units_per_box
        truckSize -= take
        
        if truckSize == 0:
            break  # Truck is full
            
    return total_units
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n = number of box types (due to the sort). The for-loop is O(n).
- **Space Complexity:** O(1) extra space (if in-place sort is allowed), otherwise O(n) if not.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you also wanted to maximize the number of distinct box types loaded?
  *Hint: Would require tracking of how many different types you select, possibly at the expense of total units.*

- Suppose the truck can only carry certain *types* of boxes (e.g., only allowed types or weight restrictions).
  *Hint: Add an additional filter step before sorting and filling.*

- If each box type also has a weight per box, and the truck has both box and weight limits, how would you adapt the algorithm?
  *Hint: Turns into a variant of the knapsack problem, which may require DP instead of greedy.*

### Summary
The approach uses a classic **greedy algorithm** pattern, specifically “sort and take as much as possible of the most valuable”.  
This is the same scheme used for some knapsack-like problems where every box is indistinguishable within its type.  
The key insight is sorting by value (units per box), which ensures optimality when each item is independently available in quantity.  
This pattern appears in scheduling, container loading, inventory selection, and resource allocation problems.