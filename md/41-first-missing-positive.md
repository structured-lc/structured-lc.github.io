### Leetcode 41 (Hard): First Missing Positive [Practice](https://leetcode.com/problems/first-missing-positive)

### Description  
Given an unsorted integer array, find the **smallest missing positive integer** (i.e., the smallest positive integer not present in the array). The twist is: you must do this in **O(n)** time and use **O(1)** extra space.  
*In other words, given nums, return the first positive integer (starting from 1) that doesn’t appear in nums. Negative values and zeros don’t matter. The array can contain duplicates.*

### Examples  

**Example 1:**  
Input: `[1,2,0]`  
Output: `3`  
*Explanation: The array contains 1 and 2, so 3 is the smallest missing positive.*

**Example 2:**  
Input: `[3,4,-1,1]`  
Output: `2`  
*Explanation: 1, 3, 4 are present, but 2 is not. 2 is the missing positive.*

**Example 3:**  
Input: `[7,8,9,11,12]`  
Output: `1`  
*Explanation: No positive integers from 1 to 6 are present, so 1 is the answer.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Add everything greater than 0 to a set.
  - Then, from 1 to n+1 (n = len(nums)), check each number—return the first not in the set.
  - **Drawback:** This uses O(n) extra space; does not meet the O(1) space constraint.

- **Optimized (Index Placement) Approach:**  
  - **Key observation:** For an array of length n, the answer must be in 1...n+1.
  - Try to place each number x into its "ideal" position: nums[x-1].
  - For example, 1 should ideally be at index 0, 2 at index 1, and so on.
  - **Process:**
    - Traverse the array, and for every integer x in 1...n, swap it into its desired position (nums[x-1]) if not already there, repeat until nothing to swap.
    - Ignore numbers ≤ 0 or > n.
    - After these swaps, scan left to right: the first index i that doesn’t contain i+1 is the answer.
    - If all positions are correct (nums[i] == i+1), the answer is n+1.
  - This works because we're only swapping in place and avoid using extra space except for a few variables.

### Corner cases to consider  
- Empty array: `[]` ⇒ return 1.
- Array with all negatives/zeros: `[-1,-2,0]` ⇒ return 1.
- Array with consecutive positives: `[1,2,3]` ⇒ return 4.
- Array with one element: `[1]` ⇒ return 2; `[2]` ⇒ return 1; `[-1000]` ⇒ return 1.
- Duplicates: `[1,1]`, `[2,2]`, `[1,2,2]`.
- Large out-of-bound values mixed in: `[100,4,200,1,2]`.
- All numbers present but jumbled: `[2,1,4,3]` ⇒ return 5.

### Solution

```python
def firstMissingPositive(nums):
    n = len(nums)
    
    for i in range(n):
        # Place nums[i] into its "right" position if possible
        while (
            1 <= nums[i] <= n and 
            nums[nums[i] - 1] != nums[i]
        ):
            # Swap current number to its intended index
            correct_idx = nums[i] - 1
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
            # No increment here: new nums[i] could need action too

    # After placement, scan for first missing
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1

    return n + 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each number is swapped at most once. The //while// loop may seem nested but each element goes to its desired position once, so total swaps is O(n).
- **Space Complexity:** O(1), only a few variables for swapping; rearranges in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you aren’t allowed to modify the input array?
  *Hint: Can you do something with a bitset, or a hashset? What is the new space complexity?*

- What if negative numbers counted too? (First missing integer, not positive)
  *Hint: Would the method change? What if the array can contain zero?*

- How to handle the case when you are limited to one swap per pass?
  *Hint: Would you need more than linear time, or is there a clever workaround?*

### Summary
This problem is a classic example of **cyclic sorting** (also called “Index Placement” trick), commonly used when a sequence can be placed in O(1) space by using the indices of the array as targets for the in-place reordering. This approach is powerful for “find the missing or duplicate” in consecutive ranges. Variants show up in sorting cyclic lists, finding duplicates, or marking arrays using index flipping. The in-place technique eliminates the need for extra memory and is a valuable coding pattern for interviews.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- Missing Number(missing-number) (Easy)
- Find the Duplicate Number(find-the-duplicate-number) (Medium)
- Find All Numbers Disappeared in an Array(find-all-numbers-disappeared-in-an-array) (Easy)
- Couples Holding Hands(couples-holding-hands) (Hard)
- Smallest Number in Infinite Set(smallest-number-in-infinite-set) (Medium)
- Maximum Number of Integers to Choose From a Range I(maximum-number-of-integers-to-choose-from-a-range-i) (Medium)
- Smallest Missing Non-negative Integer After Operations(smallest-missing-non-negative-integer-after-operations) (Medium)
- Maximum Number of Integers to Choose From a Range II(maximum-number-of-integers-to-choose-from-a-range-ii) (Medium)
- Smallest Missing Integer Greater Than Sequential Prefix Sum(smallest-missing-integer-greater-than-sequential-prefix-sum) (Easy)