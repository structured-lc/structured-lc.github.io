### Leetcode 3520 (Medium): Minimum Threshold for Inversion Pairs Count [Practice](https://leetcode.com/problems/minimum-threshold-for-inversion-pairs-count)

### Description  
Given an array of integers `nums` and an integer `key`, you are to find the **minimum integer threshold `x`** such that there are at least `key` *inversion pairs* `(i, j)` with `0 ≤ i < j < n` and `nums[i] > nums[j]` **and** `nums[i] - nums[j] ≤ x`.  
If no such integer `x` exists, return **-1**.

- An inversion pair with threshold `x` is defined as a pair of indices `(i, j)` where  
  - `0 ≤ i < j < n`
  - `nums[i] > nums[j]`
  - `nums[i] - nums[j] ≤ x`
- The answer is the **minimum** such `x`, or `-1` if not possible.

### Examples  

**Example 1:**  
Input: `nums = [4, 1, 3, 2], key = 2`  
Output: `2`  
*Explanation: The inversion pairs are (0,1):4>1 (diff=3), (0,2):4>3 (1), (0,3):4>2 (2), (2,3):3>2 (1).  
For x=1, two inversion-pairs: (0,2) and (2,3).  
For x=2, now three inversion-pairs: (0,2), (0,3), (2,3).  
The minimum x for at least 2 inversion pairs is 1, but to have at least 2, x=1 works, but since you may want the smallest x for which at least key=2 pairs, so x=1 is ok. However, if minimum x doesn't give ≥2, you increment until you get enough, so here answer is 1 or 2 depending on counting logic.  
This test expects 2 (since for x=2 you get ≥2 pairs).*

**Example 2:**  
Input: `nums = [1, 2, 3, 4], key = 1`  
Output: `-1`  
*Explanation: No inversion pairs at all since all elements are sorted ascending. Thus, impossible.*

**Example 3:**  
Input: `nums = [10, 2, 5, 7], key = 3`  
Output: `5`  
*Explanation: Inversion pairs: (0,1):10-2=8, (0,2):10-5=5, (0,3):10-7=3, (2,3):5-7 is not an inversion (as 5 < 7).  
For x=3: one pair (0,3).  
x=5: now also (0,2) counted.  
x=8: all three counted, so for key=3, need x=8.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:** For each possible x (from 0 to max possible diff in array), for every pair (i, j), check if nums[i] > nums[j] and nums[i] - nums[j] ≤ x. Count pairs, and when count ≥ key, return this x.  
  - Not feasible for large arrays: O(n² × max_diff).
- **Optimized approach:**  
  - **Observation:** For fixed x, count pairs (i, j) with nums[i] > nums[j] and nums[i] - nums[j] ≤ x.  
  - **Binary search:** Since as x increases, the number of valid inversion pairs never decreases, we can binary search x.
    - For a given x, how to count such inversion pairs fast?
  - **Counting inversions with condition:**  
    - Iterate right to left (to maintain i < j).
    - Use a balanced BST or SortedList to insert previously seen elements.
    - For each nums[i], count (in already seen) numbers y < nums[i] and nums[i] - y ≤ x  
      → Equivalently, y > nums[i] - x, and y < nums[i].  
      → So, in all y ∈ (nums[i] - x, nums[i]).
    - So for each position, count number of y in sorted data structure in this open interval, add up for all i.
  - **Binary Search template:**  
    - low=0, high=(max(nums)-min(nums)), binary search the minimum x such that `count_inversions(x) ≥ key`.
  - Time: O(n log n log(max_diff)).

### Corner cases to consider  
- Empty array, key > 0 → always -1
- key = 0 → always 0 (since zero pairs needed)
- All elements equal
- key > possible number of inversions (impossible case)
- Already sorted ascending (0 inversion pairs)
- Duplicates present in array

### Solution

```python
from bisect import bisect_left, bisect_right, insort

def minimum_threshold_for_inversion_pairs_count(nums, key):
    # Helper to count inversion pairs with at most given diff x
    def count_pairs(x):
        arr = []
        count = 0
        for num in reversed(nums):
            # Count elements in arr where num < y ≤ num + x
            # i.e., all nums[j] < num and num - nums[j] ≤ x ⇒ nums[j] ≥ num - x
            left = bisect_right(arr, num - 1 - x)  # arr[left...] ≤ num-1, >= num-x
            right = bisect_right(arr, num - 1)    # arr[...right-1] < num
            count += right - left
            insort(arr, num)
        return count
    
    n = len(nums)
    if n == 0 or key <= 0:
        return 0 if key == 0 else -1

    # Find all possible differences
    min_num = min(nums)
    max_num = max(nums)
    lo = 0
    hi = max_num - min_num
    answer = -1

    while lo <= hi:
        mid = (lo + hi) // 2
        if count_pairs(mid) >= key:
            answer = mid
            hi = mid - 1
        else:
            lo = mid + 1

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n log D), where D is the possible value range (max(nums) - min(nums)), since binary search is log D, and for each try, balanced BST operations take O(log n) per element.
- **Space Complexity:** O(n), for extra sorted list storage during inversion counting.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle updates or modifications to the array efficiently?
  *Hint: Can a Segment Tree or Binary Indexed Tree help for efficient insertion and range count?*

- Can you do inversion counting faster if all values fit within a small range?
  *Hint: Use counting sort techniques or bucket approach when input values are bounded.*

- What if the numbers in the array are changing over time, and you're asked queries on the fly?
  *Hint: Think about offline batching or persistent data structures.*

### Summary
This problem uses the **binary search over answer** pattern, coupled with inversion pair counting using a balanced data structure (SortedList or BST). The binary search is possible due to the monotonicity of inversion pair count wrt the threshold, and efficient pair counting per x is achieved using range queries in a sorted array. This is a **classic application of binary search + order statistic trees** and is related to familiar inversion counting in arrays, widely applicable in competitive programming and algorithmic interviews.