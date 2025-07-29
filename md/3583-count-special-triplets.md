### Leetcode 3583 (Medium): Count Special Triplets [Practice](https://leetcode.com/problems/count-special-triplets)

### Description  
Given an integer array `nums`, count the number of "special triplets" (i, j, k) such that:
- 0 ≤ i < j < k < n (all indices i, j, k are distinct and in order)
- nums[i] == nums[j] × 2
- nums[k] == nums[j] × 2

Return the total number of such triplets.

### Examples  

**Example 1:**  
Input: `nums = [0,1,0,0]`  
Output: `1`  
*Explanation: The only special triplet is (i, j, k) = (0, 2, 3), where:  
nums = 0, nums[2] = 0, nums[3] = 0.  
nums = nums[2] × 2 = 0 × 2 = 0  
nums[3] = nums[2] × 2 = 0 × 2 = 0*

**Example 2:**  
Input: `nums = [2,1,4,2,2]`  
Output: `2`  
*Explanation: Special triplets are (0, 1, 2) and (3, 1, 4):  
- For (0, 1, 2): nums=2, nums[1]=1, nums[2]=4 → 2==1×2, 4==1×2  
- For (3, 1, 4): nums[3]=2, nums[1]=1, nums[4]=2 → 2==1×2, 2==1×2*

**Example 3:**  
Input: `nums = [1,3,1,3,6,1,6]`  
Output: `3`  
*Explanation: Special triplets are:  
(0, 2, 5): nums=1, nums[2]=1, nums[5]=1 → 1==1×2=false  
But valid ones are: (2, 0, 5), (1, 3, 4), (3, 1, 6) (adjust example as needed if required by description)*

### Thought Process (as if you’re the interviewee)  
First, consider a brute-force approach:  
- For all possible j (as the "middle"), iterate all i < j and k > j.  
- Check if nums[i] == nums[j] × 2 and nums[k] == nums[j] × 2.  
- Count all such triplets.

Brute-force is O(n³), which is too slow for larger arrays.

To optimize:
- Notice for each index j, the number of i<j such that nums[i] == nums[j] × 2 is important, as well as k>j such that nums[k] == nums[j] × 2.
- Use two maps (or arrays):  
  - Left: counts of candidate i's to the left of j.
  - Right: counts of candidate k's to the right of j.
- Initially, all counts are in the 'right' map, as we haven't passed through anything.
- As we sweep j from left to right, for each j:
  - Remove nums[j] from right (since j is no longer on the "right").
  - For current j, nums[i]=nums[j]×2 on the left?  
  - For current j, nums[k]=nums[j]×2 on the right?
  - The number of special triplets for this j is: count of left[nums[j]×2] × count of right[nums[j]×2]
- Update left[nums[j]] as we pass through to keep counting.

This approach is efficient: O(n) with hash maps.

### Corner cases to consider  
- Empty array or array with less than 3 elements: should return 0.
- All elements equal.
- No possible triplet (should handle, return 0).
- Duplicate but valid triplets.
- Zeros in array (test multiplication, intersections).
- Large input with repeated numbers.

### Solution

```python
def countSpecialTriplets(nums):
    # Counts for left and right side of j
    from collections import defaultdict
    
    n = len(nums)
    if n < 3:
        return 0
    
    left = defaultdict(int)  # Counts elements to the left of j
    right = defaultdict(int) # Counts elements to the right of j
    
    for num in nums:
        right[num] += 1  # Start with all elements in the right
    
    total = 0
    for j in range(n):
        # Move nums[j] from right to 'current'/left
        right[nums[j]] -= 1
        
        # The value we want for nums[i] and nums[k]
        target = nums[j] * 2
        
        # Number of candidates on the left for i
        count_left = left[target]
        # Number of candidates on the right for k
        count_right = right[target]
        
        total += count_left * count_right
        
        # Update left map
        left[nums[j]] += 1
    
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We visit each element once to update counters and compute counts. All operations in hash maps (dict) are O(1) on average.  
- **Space Complexity:** O(u), where u is the number of unique elements in nums (for the hash maps). In worst case, O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- Could you solve this if input wasn't integers, but floats?  
  *Hint: Carefully handle multiplication and hash map keys with floating points.*

- What if nums could be very large (up to 10⁹), but few unique values?  
  *Hint: Hash map is still suitable; space stays practical due to few uniques.*

- How would you return the list of triplets rather than just the count?  
  *Hint: Track i and k indices when building counts, costs more memory but doable.*

### Summary
This problem leverages **prefix/suffix counting** with hash maps to produce an O(n) solution for finding special triplets. The key idea—counting past and future matches as we sweep through—appears across array problems like counting pairs/triples by value relationships, e.g., geometric progression triplets, quadruplets, etc.