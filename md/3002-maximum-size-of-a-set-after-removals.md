### Leetcode 3002 (Medium): Maximum Size of a Set After Removals [Practice](https://leetcode.com/problems/maximum-size-of-a-set-after-removals)

### Description  
Given two integer arrays **nums1** and **nums2**, each of even length n, you must remove exactly ⌊n/2⌋ elements from each array. After these removals, combine all the remaining elements from both arrays into a set **s** (which automatically removes duplicates). Return the maximum possible size of set **s** after the removals.

In other words:  
- Remove half the elements from each array.
- Maximize the size of the set formed by the leftovers.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2,1,2]`, `nums2 = [1,1,1,1]`  
Output: `2`  
*Explanation: Remove two 1's from nums1 (so nums1 = [2,2]) and two 1's from nums2 (so nums2 = [1,1]). The combined set = {1,2}.*

**Example 2:**  
Input: `nums1 = [1,2,3,4,5,6]`, `nums2 = [2,3,2,3,2,3]`  
Output: `5`  
*Explanation: Remove 2, 3, and 6 from nums1 (nums1 = [1,4,5]); remove two 3's and one 2 from nums2 (nums2 = [2,3,2]). The combined set = {1,2,3,4,5}.*

**Example 3:**  
Input: `nums1 = [1,2,3,4]`, `nums2 = [2,3,4,5]`  
Output: `5`  
*Explanation: Remove 1,2 from nums1 (nums1 = [3,4]); remove 2,3 from nums2 (nums2 = [4,5]). Set = {3,4,5}.*

### Thought Process (as if you’re the interviewee)  
First, if we could keep all the unique elements from both arrays, our set would simply be the union of both arrays, and its size would be the total number of unique elements. However, the removals could force us to drop important elements, reducing the possible set size.

**Brute-force idea:** Try all combinations of elements to keep in both arrays (choose ⌊n/2⌋ in each), and take the union. This approach is computationally huge and not feasible for large n.

**Optimization:**  
- Since we want the largest possible set size, we should strive to keep as many unique elements as possible.
- For each element, the *maximum* number we can keep is limited by its total count across both arrays and the number of slots left after removals.
- The true maximum set size is min(u₁ + (n/2), u₂ + (n/2), total unique elements), where u₁ and u₂ are unique counts in each array after removals, but in practice, simply:  
   - Take all unique elements in both arrays, but making sure we can keep at least ⌊n/2⌋ elements from each array.

**Key insight:**  
- For each array of length n, after removals, only n/2 elements are left. You can't have a set with more than n elements (because combined, that's the total number of leftover elements).
- But you also can't have more unique elements than exist in the union of both arrays.
- So, the result is min(unique elements in nums1 + nums2, n)

### Corner cases to consider  
- Both arrays are identical.
- All elements are the same.
- No elements are duplicated.
- Edge case: arrays of length 2.
- All unique elements distributed strategically, such that removals may block keeping some (though n always even).

### Solution

```python
def maximum_set_size_after_removals(nums1, nums2):
    n = len(nums1)
    half = n // 2

    # unique elements in both arrays
    set1 = set(nums1)
    set2 = set(nums2)

    # total possible unique elements to keep (set union)
    total_unique = len(set1 | set2)

    # at most half elements from each after removals
    # so total kept = n (half from each)
    return min(total_unique, n)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Calculating set1 and set2 is O(n) each.
  - Union is O(n).
  - All other operations are O(1).
- **Space Complexity:** O(n)
  - Extra space for two sets (unique elements), so up to O(n) total.

### Potential follow-up questions (as if you’re the interviewer)  

- If one array is much larger than the other, how would you generalize the solution?  
  *Hint: Allow different removal counts for each array and adapt the unique count logic accordingly.*

- If you can remove any number of elements as long as both arrays end up with the same length, how would that affect the answer?  
  *Hint: The constraint shifts — can you always build the largest possible set?*

- What if we process streaming data or very large arrays that don't fit in memory?  
  *Hint: Think about how you can track unique counts in a space-efficient way (e.g., Bloom filters).*

### Summary
This approach is based on set operations and greedy logic: you can never keep more unique elements than physically left after removals, nor more than exist in the union. The coding pattern is a classic application of set data structures and the min-max principle for optimizing selection under limiting constraints. This is a common pattern when maximizing diversity under quota constraints, and appears in allocation, selection, or packing-style problems.