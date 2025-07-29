### Leetcode 912 (Medium): Sort an Array [Practice](https://leetcode.com/problems/sort-an-array)

### Description  
Given an array of integers, **sort** it in ascending order. You must implement an efficient sorting algorithm yourself (like quicksort, mergesort, or heapsort). You cannot use built-in or library sorting functions.  
*For example, given an input array, you need to sort the numbers from smallest to largest and return the resulting array.*

### Examples  

**Example 1:**  
Input: `[5, 2, 3, 1]`  
Output: `[1, 2, 3, 5]`  
*Explanation: The array is sorted in ascending order. Every element is moved to its correct position.*

**Example 2:**  
Input: `[5, 1, 1, 2, 0, 0]`  
Output: `[0, 0, 1, 1, 2, 5]`  
*Explanation: After sorting, duplicate elements group together, and all numbers appear in increasing order.*

**Example 3:**  
Input: `[2, 1, 3]`  
Output: `[1, 2, 3]`  
*Explanation: Sorting arranges 1 before 2 and 2 before 3, resulting in an increasing sequence.*

### Thought Process (as if you’re the interviewee)  
First, think of the most naive solution: **Insertion Sort** or **Bubble Sort**. These have a time complexity of O(n²), which is too slow for large arrays (n up to 10,000) and will likely result in timeouts on LeetCode for bigger test cases.

Next, consider more optimal, efficient algorithms like:
- **Mergesort** (guaranteed O(n log n) time, but O(n) extra space),
- **Quicksort** (average O(n log n) time, in-place, but O(n²) in worst-case without randomization or good pivot selection),
- **Heapsort** (O(n log n) time and O(1) space but less cache-friendly and more complex to implement).

For interviews and coding practice, **mergesort** is a good choice, as it's easy to implement recursively and always O(n log n).

**Quick rationale:**  
- Handles large arrays efficiently (n up to 10,000).
- Easy to reason about correctness for all cases (especially edge and duplicate elements).
- Not affected by the distribution/order of the input (i.e., avoids the quicksort worst-case).

### Corner cases to consider  
- Empty array (`[]`)  
- Array of length 1 (`[x]`)  
- Array with all duplicate elements (`[2,2,2,2,2]`)  
- Already sorted array (`[1,2,3,4]`)  
- Reverse sorted array (`[5,4,3,2,1]`)  
- Array with negative and positive numbers (`[-3,0,2,-1,4]`)  
- Array containing large numbers and zeroes (`[0,10000,-10000,5,0]`)

### Solution

```python
def sortArray(nums):
    # Helper function for merge sort
    def merge_sort(left, right):
        if left >= right:
            return
        
        mid = left + (right - left) // 2
        # Recursively sort the left half
        merge_sort(left, mid)
        # Recursively sort the right half
        merge_sort(mid + 1, right)
        # Merge the two sorted halves
        merge(left, mid, right)
    
    def merge(left, mid, right):
        # Make copies of the two subarrays to merge
        L = nums[left:mid+1]
        R = nums[mid+1:right+1]
        i = 0  # Pointer for left half
        j = 0  # Pointer for right half
        k = left  # Pointer for merged array
        
        # Merge while both arrays have elements
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                nums[k] = L[i]
                i += 1
            else:
                nums[k] = R[j]
                j += 1
            k += 1
        # Copy any remaining elements of left half
        while i < len(L):
            nums[k] = L[i]
            i += 1
            k += 1
        # Copy any remaining elements of right half
        while j < len(R):
            nums[k] = R[j]
            j += 1
            k += 1

    merge_sort(0, len(nums) - 1)
    return nums
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), since each level of recursion merges the array in O(n) time and there are log n levels due to subdividing the array.
- **Space Complexity:** O(n), due to the auxiliary arrays created during each merge operation (temporary left/right halves of the input).

### Potential follow-up questions (as if you’re the interviewer)  

- *Can you implement a sorting algorithm that works in-place (O(1) space)?*  
  *Hint: Think about quicksort or heapsort.*

- *How would you sort an array with mostly duplicate elements more efficiently?*  
  *Hint: Certain optimizations in quicksort or using a three-way partitioning technique can help.*

- *If the array is almost sorted, which algorithm would perform best?*  
  *Hint: Insertion sort is efficient for nearly sorted data (runs in O(n) in such cases).*

### Summary
This problem tests the understanding of array sorting algorithms beyond built-in methods and emphasizes mastering **divide and conquer** patterns like mergesort (or quicksort). The coding pattern seen here is one of the most fundamental in algorithm design. Mastering this equips you to solve related problems involving partitioning, merging, and maintaining order, which are common in interviews and in the implementation of many standard library features.