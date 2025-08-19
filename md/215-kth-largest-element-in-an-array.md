### Leetcode 215 (Medium): Kth Largest Element in an Array [Practice](https://leetcode.com/problems/kth-largest-element-in-an-array)

### Description  
Given an array of integers `nums` and an integer `k`, you are to find the kᵗʰ largest element in the array. This means if you sorted the array in descending order, the element at position k (1-indexed) would be the answer.  
Duplicates are allowed, and each duplicate counts towards the ranking.  
The challenge is to do this efficiently—even with very large arrays—preferably without fully sorting the array.

### Examples  

**Example 1:**  
Input: `nums = [3, 2, 1, 5, 6, 4]`, `k = 2`  
Output: `5`  
*Explanation: Sorted array is [1, 2, 3, 4, 5, 6]. The 2ⁿᵈ largest is 5.*

**Example 2:**  
Input: `nums = [3, 2, 3, 1, 2, 4, 5, 5, 6]`, `k = 4`  
Output: `4`  
*Explanation: Sorted array is [1, 2, 2, 3, 3, 4, 5, 5, 6]. The 4ᵗʰ largest is 4.*

**Example 3:**  
Input: `nums = `, `k = 1`  
Output: `7`  
*Explanation: Only one element, so it's the 1ˢᵗ largest (and only) element.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Sort the array in descending order and return the kᵗʰ element.  
  - Time Complexity: O(n log n)
  - Space Complexity: O(1) (if sorting in place)

- **Can we do better?**  
  Since we only care about the kᵗʰ largest, we don't need the entire array to be sorted.  
  - Use a min-heap (of size k):  
    - Iterate through the array, maintain a min-heap of size k.
    - Push each element to the heap; if the size exceeds k, pop the smallest.
    - The top of the heap is the answer after processing all elements.
    - Time: O(n log k), Space: O(k)
  
  - Use Quickselect (variation of quicksort partition):  
    - Expected O(n) time, O(1) space.
    - Partition the array such that all greater elements are on the left.
    - Recurse only on the portion that contains the kᵗʰ largest.
    - Not stable for worst-case, but good in practice.

- **Which to pick?**  
  - If O(n log k) is acceptable and the code needs to be simple and stable, use the heap.
  - For better average performance and O(1) space, use quickselect.
  - In interviews, quickselect is often preferred for this problem.

### Corner cases to consider  
- Array length is less than k (invalid input)
- Array contains only one element  
- All elements are the same (duplicates)
- k is 1 (find the maximum)
- k equals array length (find the minimum)
- Negative and large positive numbers
- Already sorted arrays (ascending/descending)


### Solution

```python
def findKthLargest(nums, k):
    # Helper: Lomuto partitioning, returns the index of the pivot
    def partition(left, right, pivot_index):
        pivot_value = nums[pivot_index]
        # Move pivot to end
        nums[pivot_index], nums[right] = nums[right], nums[pivot_index]
        store_index = left
        # Move all larger elements to the left
        for i in range(left, right):
            if nums[i] > pivot_value:   # '>' for kᵗʰ largest
                nums[store_index], nums[i] = nums[i], nums[store_index]
                store_index += 1
        # Move pivot to its correct place
        nums[right], nums[store_index] = nums[store_index], nums[right]
        return store_index

    left, right = 0, len(nums) - 1
    k_index = k - 1  # kth largest is at index k-1 in sorted descending order

    while left <= right:
        # Use right as pivot (could randomize for better performance)
        pivot_index = partition(left, right, right)
        if pivot_index == k_index:
            return nums[pivot_index]
        elif pivot_index < k_index:
            left = pivot_index + 1
        else:
            right = pivot_index - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Quickselect is O(n) *on average* because each partition ideally removes about half the search space.
  - In the *worst-case* (e.g., already sorted, bad pivots every time), it's O(n²), but this is rare and mitigated with random pivots.
- **Space Complexity:**  
  - O(1) extra space (in-place), plus call stack (O(1) if iterative, O(log n) if recursive).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is immutable and you must return many kth largest queries?
  *Hint: Consider preprocessing with a heap or binary search tree structure.*

- How would you solve this if elements are arriving as a stream?
  *Hint: Maintain a min-heap of size k.*

- Can you find the kᵗʰ smallest instead?
  *Hint: Adapt the logic—just switch comparison or compute index.*

### Summary
This problem uses the **Quickselect** pattern—an efficient selection-based partition similar to Quicksort—to find the kᵗʰ largest element without fully sorting the array. Quickselect demonstrates a common interview technique for partial sorting or selection, and is widely applicable to "top k" or "ranked order" problems.  
A **min-heap approach** is also commonly used for streaming data or when performance guarantees are more important than average-case speed.

### Tags
Array(#array), Divide and Conquer(#divide-and-conquer), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Quickselect(#quickselect)

### Similar Problems
- Wiggle Sort II(wiggle-sort-ii) (Medium)
- Top K Frequent Elements(top-k-frequent-elements) (Medium)
- Third Maximum Number(third-maximum-number) (Easy)
- Kth Largest Element in a Stream(kth-largest-element-in-a-stream) (Easy)
- K Closest Points to Origin(k-closest-points-to-origin) (Medium)
- Find the Kth Largest Integer in the Array(find-the-kth-largest-integer-in-the-array) (Medium)
- Find Subsequence of Length K With the Largest Sum(find-subsequence-of-length-k-with-the-largest-sum) (Easy)
- K Highest Ranked Items Within a Price Range(k-highest-ranked-items-within-a-price-range) (Medium)