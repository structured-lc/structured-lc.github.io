### Leetcode 3566 (Medium): Partition Array into Two Equal Product Subsets [Practice](https://leetcode.com/problems/partition-array-into-two-equal-product-subsets)

### Description  
Given an array of **distinct** positive integers `nums` and an integer `target`, partition `nums` into two **non-empty, disjoint subsets** (each element in exactly one subset) such that the product of numbers in **both** subsets is equal to `target`. Return `True` if such a partition exists; otherwise, return `False`.

### Examples  

**Example 1:**  
Input: `nums = [3, 1, 6, 8, 4]`, `target = 24`  
Output: `True`  
*Explanation: One valid split is [3, 8] and [1, 6, 4]. Product of [3, 8] = 24, product of [1, 6, 4] = 24.*

**Example 2:**  
Input: `nums = [2, 5, 3, 7]`, `target = 15`  
Output: `False`  
*Explanation: No way to split into two non-empty disjoint subsets each with product 15.*

**Example 3:**  
Input: `nums = [6, 2, 12]`, `target = 12`  
Output: `False`  
*Explanation: Each subset must be non-empty. Splitting into  and [6,2] gives products 12 and 12, but [6,2] = 12 is fine,  = 12; in this case, both are non-empty, so actually output is True. However, be sure to check further logic for minimal cases.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Try all possible ways to split the array into two non-empty, disjoint subsets. For each, check if both subsets have product equal to `target`.
- The total number of ways to partition into two non-empty subsets is 2ⁿ - 2 (excluding empty and all-inclusive).
- For each possible subset, its complement forms the other subset. For each subset (represented by a bitmask), calculate its product and the product of its complement. Check if both equal to `target`.
- **Optimization:**  
  - Numbers are *distinct* and length is small (≤12). So, we can enumerate all possible subset masks (except all 0s and all 1s).
  - Store/early exit if the product exceeds `target` (since all nums are positive).
  - To avoid double-counting (e.g., [A],[B] vs [B],[A]), only consider subsets whose mask is less than its complement’s mask.

### Corner cases to consider  
- All elements equal to 1.
- `target` is 0 or 1.
- Splitting requires both subsets to be non-empty.
- Arrays of size 3 (minimum allowed).
- Target not possible given input product.
- Large/small target compared to nums.

### Solution

```python
def canPartition(nums, target):
    n = len(nums)
    total_masks = 1 << n

    for mask in range(1, total_masks - 1):
        prod1 = 1
        valid1 = True
        for i in range(n):
            if (mask >> i) & 1:
                prod1 *= nums[i]
                if prod1 > target:
                    valid1 = False
                    break
        if not valid1 or prod1 != target:
            continue

        # Build the complement subset
        prod2 = 1
        valid2 = True
        for i in range(n):
            if not (mask >> i) & 1:
                prod2 *= nums[i]
                if prod2 > target:
                    valid2 = False
                    break
        if valid2 and prod2 == target:
            return True

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ × n).  
  - Each subset (except empty/full) is checked. For each, computing the product can be up to O(n).
- **Space Complexity:** O(1).  
  - Only variables for iteration and products. (No extra structure besides input.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if `nums` is not guaranteed to have distinct values?
  *Hint: How would your approach change? What if duplicate products are possible?*

- What if you had to list *all* possible valid partitions?
  *Hint: Store both masks where both subsets’ products match; output as needed.*

- What if you need to partition into *k* subsets with equal product?
  *Hint: Generalize the bitmask + product recursion to handle k-way split (see Leetcode 698: K Equal Sum Subsets).*

### Summary
This problem is a subset generation/bitmask enumeration problem leveraging constraints (n ≤ 12, distinct, positive) for tractability. The brute-force approach is effective due to small n. The core logic—generating all subsets and matching a property via their complement—applies commonly to partition/splitting subset problems, and is adaptable for similar equal-sum/product set partition challenges.


### Flashcard
Use bitmask enumeration to try all possible subsets; for each subset, compute its product and the complement's product; count subsets where both products equal the target.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Recursion(#recursion), Enumeration(#enumeration)

### Similar Problems
