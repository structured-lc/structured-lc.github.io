### Leetcode 3670 (Medium): Maximum Product of Two Integers With No Common Bits [Practice](https://leetcode.com/problems/maximum-product-of-two-integers-with-no-common-bits)

### Description  
Given an array of integers `nums`, find two *distinct* indices i and j such that the product nums[i] × nums[j] is maximized, and the **binary representations** of nums[i] and nums[j] do **not** share any common set bits (i.e., (nums[i] & nums[j]) == 0). Return the maximum such product. If no pair exists, return 0.

### Examples  

**Example 1:**  
Input: `nums = [5, 9, 8, 2]`  
Output: `72`  
*Explanation: 8 (1000₂) and 9 (1001₂) have no common set bits, product = 8 × 9 = 72.*

**Example 2:**  
Input: `nums = [3, 6, 7]`  
Output: `18`  
*Explanation: 6 (110₂) and 3 (11₂) have no common set bits, product = 6 × 3 = 18.*

**Example 3:**  
Input: `nums = [1, 2, 4, 8, 16]`  
Output: `128`  
*Explanation: 8 (1000₂) and 16 (10000₂) share no common set bits, product = 8 × 16 = 128. You can also choose 4 × 16, 2 × 16, etc., but 8 × 16 is largest.*

### Thought Process (as if you’re the interviewee)  
- Start with **brute-force**: Try all pairs (i, j), for i ≠ j, check if they have no common bits ((nums[i] & nums[j]) == 0), and track the maximum product.
- **Optimization**: Since there could be up to n² pairs (where n ≤ 10⁴), can we do better?  
  - Use bitmasks: For each number, its bits uniquely represent what it “blocks” (nums[i] & nums[j] == 0 means no overlap).
  - For all unique bitmasks, keep the **largest number** for that mask.
  - Then, for every pair of masks with mask₁ & mask₂ == 0, check max values for those masks.
- As an interviewer, I'd explain: Most optimal observed method is still O(n²) because you must check O(n²) mask pairs in the worst case, but with preprocessing you can avoid redundant/comparatively small number pairs.

### Corner cases to consider  
- nums has only one element (`[x]`) → return 0  
- All numbers share at least one set bit; no valid pair → return 0  
- Duplicate numbers  
- nums contains 0 (all bits zero—can be paired with anything)  
- Very large numbers that might have overlapping higher bits

### Solution

```python
def max_product_no_common_bits(nums):
    # Preprocess: For each unique bitmask, keep the largest number with that mask
    mask_to_max = {}
    for num in nums:
        mask = num
        if mask in mask_to_max:
            mask_to_max[mask] = max(mask_to_max[mask], num)
        else:
            mask_to_max[mask] = num

    max_product = 0
    unique_masks = list(mask_to_max.keys())
    n = len(unique_masks)
    
    # For every pair of unique masks, if they have no common bits, update max_product
    for i in range(n):
        for j in range(i, n):
            mask_i, num_i = unique_masks[i], mask_to_max[unique_masks[i]]
            mask_j, num_j = unique_masks[j], mask_to_max[unique_masks[j]]
            if (mask_i & mask_j) == 0:
                # Avoid using the same number twice unless it appears at least twice in nums
                if mask_i != mask_j or nums.count(num_i) > 1:
                    product = num_i * num_j
                    max_product = max(max_product, product)
    return max_product
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in the worst case if all masks are unique (all bits mutually exclusive).  
  However, preprocessing reduces duplication, and early checks prune pairs based on overlapping bits.
- **Space Complexity:** O(n) for the mask-to-max dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to output the indices of the chosen pair as well?
  *Hint: Store both value and index for each unique mask in preprocessing.*

- How would you handle numbers up to 10⁹ (more than 32 bits)?
  *Hint: Python ints support arbitrary precision, but consider efficiency and masking limitations in other languages.*

- Can you do better than O(n²) if most numbers are small or many bits are always set?
  *Hint: Consider bitset representation and pruning based on bits present in all numbers.*

### Summary
This problem is a **bitmask pairwise search**—a common pattern when determining compatibility or overlap based on unique features.  
The technique is widely used in problems like **Maximum Product of Word Lengths**, **bitwise set checks**, and **feature/mask constraints** in combinatorial algorithms.  
It also reinforces preprocessing with hashmaps to quickly pair compatible or disjoint elements.

### Tags


### Similar Problems
- Partition to K Equal Sum Subsets(partition-to-k-equal-sum-subsets) (Medium)