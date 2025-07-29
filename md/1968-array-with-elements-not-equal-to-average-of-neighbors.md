### Leetcode 1968 (Medium): Array With Elements Not Equal to Average of Neighbors [Practice](https://leetcode.com/problems/array-with-elements-not-equal-to-average-of-neighbors)

### Description  
Given an array of unique integers, rearrange the elements such that for every index i (where 1 ≤ i < n-1), the value at that index is **not equal** to the average of its immediate neighbors. In other words, for all i, `nums[i] ≠ (nums[i-1] + nums[i+1]) / 2`. You need to return *any* arrangement of the input array that satisfies this condition.

### Examples  

**Example 1:**  
Input: `[1,2,3,4,5]`  
Output: `[1,2,4,3,5]`  
Explanation:  
For `i = 1`: neighbors are 1, 4 → (1+4)/2 = 2.5 ≠ 2  
For `i = 2`: neighbors are 2, 3 → (2+3)/2 = 2.5 ≠ 4  
For `i = 3`: neighbors are 4, 5 → (4+5)/2 = 4.5 ≠ 3  

**Example 2:**  
Input: `[6,2,0,9,7]`  
Output: `[2,0,9,6,7]`  
Explanation:  
For `i = 1`: neighbors 2, 9 → (2+9)/2 = 5.5 ≠ 0  
For `i = 2`: neighbors 0, 6 → (0+6)/2 = 3 ≠ 9  
For `i = 3`: neighbors 9, 7 → (9+7)/2 = 8 ≠ 6  

**Example 3:**  
Input: `[3,1]`  
Output: `[1,3]`  
Explanation:  
For n < 3, there are no neighbors to check, so any order is valid.


### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Try all possible permutations and check if the condition is met, but that leads to O(n!) time and is infeasible for large inputs.

- **Observation:**  
  Since elements are unique and the constraint is about not being the average of neighbors, the issue arises mainly when three numbers are consecutive in value.  
  If we space the largest and smallest values apart in the array, the “average” trap is avoided.

- **Optimized approach:**  
  - **Sort the array.**
  - Split it into two halves:
    - First half: smaller numbers (`0` to ⌊n/2⌋ - 1)
    - Second half: larger numbers (⌊n/2⌋ to n-1)
  - **Interleave**: Place the smaller half at even indices and the larger at odd indices.
  - This ensures that for any index, its neighbors come from different halves and cannot have it as their average.

- **Another simple version (swap adjacent sorted elements):**
  - Sort, then swap every adjacent pair starting from index 1 (i.e. swap 1↔0, 3↔2, ...). This approach also avoids the unwanted average.

- **Why is this correct?**  
  Interleaving or swapping prevents three consecutive numbers in the input order from being in adjacent positions, thus breaking the possibility of being the average.

### Corner cases to consider  
- Arrays with less than 3 elements (size 1 or 2): Condition is vacuously true, return any arrangement.
- All elements are strictly increasing or decreasing.
- Odd and even length arrays.
- Already “valid” array (do not over-process).
- Negative numbers, very large or small numbers.

### Solution

```python
def rearrangeArray(nums):
    # Sort the input to prepare for interleaving
    nums.sort()
    n = len(nums)
    result = [0]*n

    # Split the array at ⌊n/2⌋
    mid = (n + 1) // 2  # Ensures left half is larger for odd n
    left = nums[:mid]
    right = nums[mid:]

    # Fill even indices with left half, odd with right half
    i = 0
    for num in left:
        result[i] = num
        i += 2
    i = 1
    for num in right:
        result[i] = num
        i += 2

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n) — for sorting the array. The splitting and interleaving are O(n).

- **Space Complexity:**  
  O(n) — New list of size n is constructed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array can have duplicate elements?  
  *Hint: With duplicates, the previous guarantee is broken; how can you avoid the average-of-neighbors case?*

- Can you do it in-place, with O(1) extra space?  
  *Hint: Try the swap-adjacent-pairs method directly on the sorted array.*

- If the array is very large (e.g. streaming), can this be solved more efficiently?  
  *Hint: Consider using a double-ended queue or heap to alternate values.*

### Summary
This problem relies on **sorting and careful rearrangement** so that no three (potentially consecutive) numbers are placed in a way where a number could become the average of its neighbors. The alternation/interleaving pattern is a common trick for avoiding certain relationships between consecutive elements, and shows up often in problems involving local order constraints, such as wiggle sort or separating evens and odds for distributed placement.