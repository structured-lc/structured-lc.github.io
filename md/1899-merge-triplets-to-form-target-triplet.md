### Leetcode 1899 (Medium): Merge Triplets to Form Target Triplet [Practice](https://leetcode.com/problems/merge-triplets-to-form-target-triplet)

### Description  
You are given a list of triplets (each is an array of three integers) and a **target triplet** `[x, y, z]`. You may repeatedly perform the following operation any number of times (including zero times): select two triplets and update one of them by taking the **maximum value for each coordinate** between the two. The goal is to determine **if it is possible to make the target triplet appear exactly** as one of the triplets in the list, by using any number of these merge operations.

**Constraints:**  
- The operation can only increase values in coordinate-wise max, not decrease.  
- You cannot add new triplets, only update existing ones.

### Examples  

**Example 1:**  
Input: `triplets = [[2,5,3],[1,8,4],[1,7,5]]`, `target = [2,7,5]`  
Output: `True`  
*Explanation:  
- Triplet [2,5,3] can be merged with [1,7,5], yielding [2,7,5], which matches the target.*

**Example 2:**  
Input: `triplets = [[3,4,5],[4,5,6]]`, `target = [3,2,5]`  
Output: `False`  
*Explanation:  
- No triplet has a 2 in the second position, and no merging can decrease a value.*

**Example 3:**  
Input: `triplets = [[2,5,3],[2,3,4],[1,2,5],[5,2,3]]`, `target = [5,5,5]`  
Output: `True`  
*Explanation:  
- By merging [2,5,3], [2,3,4], [1,2,5], and [5,2,3] appropriately, all positions can reach 5.*

### Thought Process (as if you’re the interviewee)  
First, let's state the brute-force approach: simulate all possible combinations of merges. However, that's computationally infeasible: the number of ways to merge is too high.

To optimize:  
- Merging only increases values in each coordinate (never decreases), and each value per position can only go as high as the target's value.
- If any coordinate of a triplet is **already greater** than the target in that coordinate, merging it in can't help (as it would "overshoot" the target in that spot).
- To *construct* the target `[x, y, z]`, we need some combination of triplets—after merging—to contribute `x` in the 0ᵗʰ, `y` in the 1ˢᵗ, and `z` in the 2ⁿᵈ position.

**Key Insight:**  
- For each coordinate, find if there is **at least one triplet** that matches the target **in that coordinate**, and does **not exceed the target in any coordinate**.  
- If you have a triplet for each coordinate that matches the target on that coordinate, and all the rest are ≤ target, then merging those triplets will compose the target exactly.

In code:  
- Use three booleans for each position, as flags.
- Loop through all triplets, and check if they are eligible (all ≤ target).
- If a triplet matches target, set first flag; and similarly for position 1 and 2.
- If all three flags are set at end, answer is True.

This is a **single pass, O(n)** solution.

### Corner cases to consider  
- Empty `triplets` array.
- All values in some dimension > target: impossible.
- Multiple triplets with exact target value.
- Only one triplet (must be exactly the target).
- Triplets where all entries are less than the target, but missing at least one required value.

### Solution

```python
def mergeTriplets(triplets, target):
    # Track if each position in target can be contributed by existing triplets
    can_0 = can_1 = can_2 = False
    x, y, z = target

    for a, b, c in triplets:
        # Only consider triplets that do not "overshoot" the target in any position
        if a > x or b > y or c > z:
            continue
        # Mark True if a triplet matches target's value at this dimension
        if a == x and b <= y and c <= z:
            can_0 = True
        if b == y and a <= x and c <= z:
            can_1 = True
        if c == z and a <= x and b <= y:
            can_2 = True

    return can_0 and can_1 and can_2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of triplets—since we do a single pass, constant extra work per triplet.
- **Space Complexity:** O(1), only constant space used for flags and variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if triplets could have more than three elements?  
  *Hint: Generalize your flags and matching to `k`-dimensional triplets.*

- How would your answer change if you could only **merge adjacent triplets** in the list?  
  *Hint: You would need to consider order and connectivity, not just the value sets.*

- Could the "update" operation be changed to min instead of max?  
  *Hint: Discuss if and how your matching and thresholding ideas would flip.*

### Summary
This problem uses a **simulation reduction** approach: by careful observation of the merge operation (coordinate-wise max), we avoid brute-force and use a **greedy flag-match** strategy to verify if each target coordinate can be "supplied" by some triplet under the constraints. This “contribution by position” is a common pattern in similar merge/combine/compose array problems where the operation is monotonic (only increases or only decreases), and can be applied in other coordinate-combine or multi-target construction problems.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
