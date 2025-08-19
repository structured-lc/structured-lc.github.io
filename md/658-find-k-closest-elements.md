### Leetcode 658 (Medium): Find K Closest Elements [Practice](https://leetcode.com/problems/find-k-closest-elements)

### Description  
Given a **sorted** array `arr` of integers, a number `k`, and a target integer `x`, return the `k` integers from `arr` that are **closest** to `x`.  
Closeness is determined by:
- An element `a` is closer than `b` if `|a - x| < |b - x|`.
- If there's a tie, the smaller integer comes first.
Return the result sorted in ascending order.

### Examples  

**Example 1:**  
Input: `arr = [1,2,3,4,5]`, `k = 4`, `x = 3`  
Output: `[1,2,3,4]`  
*Explanation: Elements closest to 3: 3 (0 away), then 2 and 4 (1 away), then 1 and 5 (2 away). Smallest values picked in tie. Sorted result is [1,2,3,4].*

**Example 2:**  
Input: `arr = [1,2,3,4,5]`, `k = 4`, `x = -1`  
Output: `[1,2,3,4]`  
*Explanation: Closest to -1 are 1 (2 away), then 2, 3, 4. The four smallest numbers.*

**Example 3:**  
Input: `arr = [1,2,3,4,5]`, `k = 4`, `x = 6`  
Output: `[2,3,4,5]`  
*Explanation: 5 is closest (1 away), then 4, 3, 2 (distance increases).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each element, calculate `|arr[i] - x|`, then sort all elements by this difference, taking the `k` smallest, and finally sort in increasing order.
  - Time: O(n log n) (due to the sort); not optimal since array is sorted.
- **Two pointer approach:** Since the array is sorted, use two pointers from both ends: remove the farther element (in terms of distance from `x`) until `k` remain.
  - Time: O(n - k); less work but still linear.
- **Binary search + sliding window:**  
  - Since the elements are sorted, the answer will always be **a window of size `k`** in the array.
  - We can binary search on the **left boundary** of this window (possible values: 0 to n - k).
  - For a guess `left`, compare the distance between `x` and `arr[left]` vs `arr[left+k]`, move left/right accordingly.
  - Time: O(log(n - k) + k).
  - This is the most efficient method for large arrays and the best trade-off.

### Corner cases to consider  
- Empty input array.
- k > len(arr) or k == 0.
- All elements in `arr` are the same.
- x is smaller/larger than all elements in `arr`.
- Multiple elements at same distance to `x`, especially with required tie-breaking (smaller value first).
- Input contains negative numbers.

### Solution

```python
def findClosestElements(arr, k, x):
    n = len(arr)
    left, right = 0, n - k

    # Binary search to find the left boundary of the k-sized window
    while left < right:
        mid = left + (right - left) // 2
        # if x is closer to arr[mid + k] than arr[mid], move window to the right
        if abs(arr[mid] - x) > abs(arr[mid + k] - x):
            left = mid + 1
        else:
            right = mid
    # window starts at left, ends at left + k
    return arr[left:left + k]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(log(n - k) + k)
  - Binary search for left boundary: O(log(n - k))
  - Slicing result (output): O(k)
- **Space Complexity:** O(k), for the output slice.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is **not sorted**?  
  *Hint: How would you efficiently find the k closest in an unsorted array? (Consider heaps.)*

- How would you modify the code to **return indices** instead of values?  
  *Hint: Think about how the window maps to the original array.*

- How would your solution change if **duplicate distances** are allowed and there's no tie-breaking on the value?  
  *Hint: Can you skip the value comparison if tie-breaking is not required?*

### Summary
This problem is a classic use of the "**Binary Search for Window on Sorted Array**" pattern. It's especially effective when you want to select a subarray/window that optimizes a property in terms of distance to a target and the array is already sorted.  
Similar ideas can be found in minimizing/maximizing subarray, sliding window median, and range queries on sorted lists.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Sliding Window(#sliding-window), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Guess Number Higher or Lower(guess-number-higher-or-lower) (Easy)
- Guess Number Higher or Lower II(guess-number-higher-or-lower-ii) (Medium)
- Find K-th Smallest Pair Distance(find-k-th-smallest-pair-distance) (Hard)
- Find Closest Number to Zero(find-closest-number-to-zero) (Easy)