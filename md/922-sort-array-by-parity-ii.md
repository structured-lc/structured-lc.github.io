### Leetcode 922 (Easy): Sort Array By Parity II [Practice](https://leetcode.com/problems/sort-array-by-parity-ii)

### Description  
Given an array `nums` containing an **equal number of odd and even non-negative integers**, arrange the array so that **even indices contain even numbers** and **odd indices contain odd numbers**.  
Return any array that satisfies this property.  
- The array length is always even.
- There is guaranteed to be a solution because the evens and odds are balanced.

### Examples  

**Example 1:**  
Input: `[4,2,5,7]`  
Output: `[4,5,2,7]`  
*Explanation: Even indices 0 and 2 contain 4 and 2 (both even), and odd indices 1 and 3 contain 5 and 7 (both odd). Other valid outputs: `[2,7,4,5]`, `[4,7,2,5]`.*

**Example 2:**  
Input: `[2,3]`  
Output: `[2,3]`  
*Explanation: Index 0 contains 2 (even), index 1 contains 3 (odd). Already valid.*

**Example 3:**  
Input: `[3,4,1,2]`  
Output: `[4,3,2,1]`  
*Explanation: Possible output—indices 0 and 2 are even numbers (4,2), 1 and 3 are odd (3,1).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force Idea:**  
  Create two separate arrays—one for evens and one for odds—by iterating through the original array. Then, rebuild the output: fill even indices with the even list, odd indices with the odd list.  
  *Pros*: Simple.  
  *Cons*: O(n) space is used for the two auxiliary arrays.

- **Optimal (In-place) Approach:**  
  Since there are exactly n/2 evens and n/2 odds and array length is even, we can place them directly:
  - Keep an `even` pointer starting at 0, and an `odd` pointer starting at 1.
  - While traversing:
    - If nums[even] is already even, skip to next even index (even += 2).
    - If nums[odd] is already odd, skip to next odd index (odd += 2).
    - If not, swap the misplaced numbers at those indices.  
  Repeat until pointers are finished  
  *Pros*: No extra space (other than maybe a few variables), only a single pass through array.
  *Trade-off*: Slightly trickier code, careful with index increments.

### Corner cases to consider  
- Smallest possible array: length 2 (`[2,3]`, `[3,2]`)
- Already valid input: (`[4,5,2,7]`)
- All evens at beginning, all odds at end: (`[2,4,1,3]`)
- Duplicates: (`[2,2,3,3]`)
- Large inputs: Check that the time/math holds for 20,000 elements.
- (Not empty/odd-length array, per problem constraints.)

### Solution

```python
def sortArrayByParityII(nums):
    # even: index for even positions (0,2,4,...)
    # odd: index for odd positions (1,3,5,...)
    even, odd = 0, 1
    n = len(nums)

    while even < n and odd < n:
        # If even index already has even number, move to next even slot
        if nums[even] % 2 == 0:
            even += 2
        # If odd index already has odd number, move to next odd slot
        elif nums[odd] % 2 == 1:
            odd += 2
        else:
            # nums[even] is odd and nums[odd] is even, swap to fix both
            nums[even], nums[odd] = nums[odd], nums[even]
            even += 2
            odd += 2
    return nums
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We look at each index at most once or twice, so total work is proportional to n.
- **Space Complexity:** O(1)  
  Only pointers/variables used; sorting is all done in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the numbers aren't perfectly balanced (unequal # of evens/odds)?
  *Hint: Should your algorithm validate input parity/counts first, or how would it react?*

- How would you do this stably? (Preserve order of original evens and odds.)
  *Hint: Would an in-place approach work, or do you need auxiliary structures?*

- How would you solve this with only read access (immutable input array)?
  *Hint: Build a new array, using two pointers for output index.*

### Summary
This problem is a classic **two-pointer in-place partitioning** scenario, related to Dutch National Flag, and common in questions that rearrange elements by some simple rule (parity, sign, color, etc).  
This approach can be generalized wherever two groups of equal count need to be placed at specific positions—like alternating gender seating, or zero/nonzero partitioning with arrangement constraints.

### Tags
Array(#array), Two Pointers(#two-pointers), Sorting(#sorting)

### Similar Problems
- Sort Array By Parity(sort-array-by-parity) (Easy)
- Rearrange Array Elements by Sign(rearrange-array-elements-by-sign) (Medium)
- Sort Even and Odd Indices Independently(sort-even-and-odd-indices-independently) (Easy)
- Largest Number After Digit Swaps by Parity(largest-number-after-digit-swaps-by-parity) (Easy)
- Find the Number of K-Even Arrays(find-the-number-of-k-even-arrays) (Medium)