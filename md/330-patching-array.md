### Leetcode 330 (Hard): Patching Array [Practice](https://leetcode.com/problems/patching-array)

### Description  
Given a **sorted integer array** (`nums`) and an integer **n**, patch (insert) elements into the array so that any number in the range [1, n] inclusive can be formed as the sum of some subset of the array.  
Return the **minimum number of patches required**.


### Examples  

**Example 1:**  
Input: `nums = [1,3]`, `n = 6`  
Output: `1`  
*Explanation:*
- Possible sums with [1,3]: 1, 3, 1+3=4.
- Missing: 2, 5, 6.
- If we add 2: possible sums expand to [1], [2], [3], [1,3]=4, [2,3]=5, [1,2]=3, [1,2,3]=6.
- Now, all 1-6 are covered; only 1 patch needed (the number 2).

**Example 2:**  
Input: `nums = [1,5,10]`, `n = 20`  
Output: `2`  
*Explanation:*
- Possible sums with [1,5,10]: 1, 5, 6, 10, 11, 15, 16.
- Missing: 2, 3, 4, 7, 8, 9, 12, 13, 14, 17, 18, 19, 20.
- Adding 2 covers more, then add 4 to cover all up to 20.
- Patches needed: [2, 4].

**Example 3:**  
Input: `nums = [1,2,2]`, `n = 5`  
Output: `0`  
*Explanation:*
- Sums possible: 1, 2, 3, 4, 5.
- All numbers from 1 to 5 are already covered.


### Thought Process (as if you’re the interviewee)  

**Brute-force idea:**  
Consider every possible subset sum in the array. If any value from 1 to n is not possible, insert that value to cover the gap. Repeat until all values can be formed.  
- **Problems:** Checking all subset sums is exponential and not scalable.

**Greedy approach (Optimal):**  
- Track the smallest sum that **cannot** be formed with the current array; call this `miss`.
- Start with miss=1.
- Walk through the array:
  - If the current `nums[i]` ≤ `miss`, we can now reach sums up to (`miss` + `nums[i]` - 1), so update `miss += nums[i]`.
  - Else, patch/add `miss` to the array, then now we can reach up to (`miss * 2 - 1`). Increment patch count. Double `miss`.
- Repeat until `miss > n`.
- **Why greedy works:**  
  We always patch using the smallest unreachable number. If we skip, we can’t reach it just by the current and future numbers.


### Corner cases to consider  
- **Empty `nums` array**
- `nums` starts with a number > 1
- `n` is 1
- Duplicates in `nums`
- `nums` already covers the range [1, n]
- Large `n` with small/empty `nums`


### Solution

```python
def minPatches(nums, n):
    patches = 0                  # Number of patches needed
    i = 0                        # Index for nums
    miss = 1                     # Smallest number we cannot form yet
    
    while miss <= n:
        if i < len(nums) and nums[i] <= miss:
            # We can use nums[i]; expand range up to miss + nums[i] -1
            miss += nums[i]
            i += 1
        else:
            # Patch is needed; add miss itself
            patches += 1
            miss += miss    # After adding miss, new miss is doubled
    return patches
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(len(nums) + log n)  
  - We either consume an element from nums or do a patch (each at most until miss > n).
  - log n because miss doubles each patch.

- **Space Complexity:** O(1)  
  - Only a few integer variables for indexes and counters; no extra storage proportional to input.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is not sorted?
  *Hint: Is sorting needed for the greedy logic to work?*

- Modify the algorithm to print the patches themselves.
  *Hint: Track which numbers you actually add, not just their count.*

- What if each number in nums can only be used once (no repeated elements in a sum)?
  *Hint: How does subset sum change under this restriction?*


### Summary
Uses a **greedy, range-expanding algorithm**: always patch with the smallest unreached number to maximize coverage per patch. This is a classic greedy pattern, sometimes called “covering the range." Variants of this idea show up in interval problems, sum construction, and data completeness scenarios.


### Flashcard
Greedily patch the array by always adding the smallest missing sum (miss) until you can form all sums up to n.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Maximum Number of Consecutive Values You Can Make(maximum-number-of-consecutive-values-you-can-make) (Medium)