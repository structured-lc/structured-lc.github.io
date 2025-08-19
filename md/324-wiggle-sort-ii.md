### Leetcode 324 (Medium): Wiggle Sort II [Practice](https://leetcode.com/problems/wiggle-sort-ii)

### Description  
Given an array of integers, **reorder the array in-place** so that it follows the wiggle property:  
- nums < nums[1] > nums[2] < nums[3] ...
In other words, the elements should alternate between being less than and greater than their neighbors.  
You can assume a valid answer always exists.

### Examples  

**Example 1:**  
Input: `nums = [1, 5, 1, 1, 6, 4]`  
Output: `[1, 6, 1, 5, 1, 4]`  
*Explanation: After reordering: 1 < 6 > 1 < 5 > 1 < 4.*

**Example 2:**  
Input: `nums = [1, 3, 2, 2, 3, 1]`  
Output: `[2, 3, 1, 3, 1, 2]`  
*Explanation: 2 < 3 > 1 < 3 > 1 < 2 satisfies the wiggle property.*

**Example 3:**  
Input: `nums = [4, 5, 5, 6]`  
Output: `[5, 6, 4, 5]`  
*Explanation: 5 < 6 > 4 < 5.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  - Sort the array.
  - Try all possible permutations to find a wiggle arrangement (not feasible for large n).
- **Improved idea:**  
  - Sort the array.  
  - Split into two halves: the smaller numbers and the larger numbers.
  - Place the smallest half at even indices and the largest half at odd indices, in reverse, so that the sequence alternates as required.
- **Optimal O(n) approach:**  
  - Find the median using QuickSelect (linear time on average).
  - Three-way partition the array (Dutch National Flag algorithm) using a *virtual indexing* trick to avoid clustering equal elements.
  - Place numbers greater than the median in odd indices, and less than the median at even indices.
  - This prevents adjacent duplicates from breaking the wiggle property and handles duplicate elements correctly.
- **Why this works:**  
  - By rearranging via virtual indexing, and partitioning around the median, it guarantees no two adjacent elements will be the same if possible.

### Corner cases to consider  
- Array with all elements equal, e.g. `[2,2,2,2]` (should be fine; any permutation satisfies)
- Array length is 1 or 2
- Array with lots of duplicates
- Array already in correct order
- Array in descending or ascending order
- Odd vs. even length arrays

### Solution

```python
def wiggleSort(nums):
    # Step 1: Find the median (kᵗʰ largest, k = ⌊n/2⌋)
    def find_median(nums):
        def select(k):
            left, right = 0, len(nums) - 1
            while left <= right:
                pivot = nums[right]
                store = left
                for i in range(left, right):
                    if nums[i] < pivot:
                        nums[store], nums[i] = nums[i], nums[store]
                        store += 1
                nums[store], nums[right] = nums[right], nums[store]
                if store == k:
                    return nums[store]
                elif store < k:
                    left = store + 1
                else:
                    right = store - 1
        n = len(nums)
        return select((n - 1) // 2)

    n = len(nums)
    median = find_median(nums[:])  # work on a copy to avoid changing nums early

    # Virtual indexing
    def mapped_index(i):
        return (1 + 2 * i) % (n | 1)
    
    left, i, right = 0, 0, n - 1
    # 3-way partition around the median, using virtual indexing
    while i <= right:
        mi = mapped_index(i)
        ml = mapped_index(left)
        mr = mapped_index(right)
        if nums[mi] > median:
            nums[ml], nums[mi] = nums[mi], nums[ml]
            left += 1
            i += 1
        elif nums[mi] < median:
            nums[mr], nums[mi] = nums[mi], nums[mr]
            right -= 1
        else:
            i += 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Median finding is O(n) on average using QuickSelect.
  - Three-way partition is O(n).
- **Space Complexity:** O(1) extra (modifies `nums` in-place, only O(1) for indices; O(n) if copying for median.)

### Potential follow-up questions (as if you’re the interviewer)  

- What might break the wiggle property if we only sorted and interleaved left and right halves?
  *Hint: Try with lots of duplicate elements and see what happens.*
- Can this problem be solved in-place without extra O(n) space?
  *Hint: Median + virtual index mapping allows in-place partitioning.*
- How does this algorithm handle arrays with all equal numbers?
  *Hint: Test it and see if the partitioning step skips unnecessary swaps.*

### Summary
This solution applies the **Dutch National Flag pattern** with virtual indexing and in-place QuickSelect to partition around the median, producing the required wiggle order in a single pass and constant extra space. The partitioning and index mapping is a useful approach in many rearrangement and bucket problems, e.g., three-color sort, rearrange evens/odds, sort colors/problems involving relative order constraints.

### Tags
Array(#array), Divide and Conquer(#divide-and-conquer), Greedy(#greedy), Sorting(#sorting), Quickselect(#quickselect)

### Similar Problems
- Sort Colors(sort-colors) (Medium)
- Kth Largest Element in an Array(kth-largest-element-in-an-array) (Medium)
- Wiggle Sort(wiggle-sort) (Medium)
- Array With Elements Not Equal to Average of Neighbors(array-with-elements-not-equal-to-average-of-neighbors) (Medium)