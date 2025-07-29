### Leetcode 1060 (Medium): Missing Element in Sorted Array [Practice](https://leetcode.com/problems/missing-element-in-sorted-array)

### Description  
Given a sorted array `nums` with unique integers, find the kᵗʰ missing number starting from the leftmost element in the array. The missing numbers are those integers that would appear between the smallest and largest elements of the array but are not present in it.  

For example, if the array is `[4, 7, 9, 10]`, the missing numbers between 4 and 10 are 5, 6, and 8. If `k = 1`, the first missing number is 5; if `k = 3`, the third missing number is 8.

### Examples  

**Example 1:**  
Input: `nums = [4, 7, 9, 10], k = 1`  
Output: `5`  
*Explanation: Between 4 and 7, missing numbers are 5 and 6. The 1ˢᵗ missing number is 5.*

**Example 2:**  
Input: `nums = [4, 7, 9, 10], k = 3`  
Output: `8`  
*Explanation: Missing numbers are 5, 6, and 8. The 3ʳᵈ missing number is 8.*

**Example 3:**  
Input: `nums = [1, 2, 4], k = 3`  
Output: `6`  
*Explanation: Missing numbers are 3, 5, 6, ... The 3ʳᵈ missing number is 6.*

### Thought Process (as if you’re the interviewee)  
- The simplest approach is to iterate through the array and count how many numbers are missing between consecutive elements until we reach the kᵗʰ missing one. This works but may be inefficient (O(n)) for large arrays.  
- Since the array is sorted, we can use binary search to efficiently find the segment where the kᵗʰ missing number lies.  
- Define a helper function `missing(i)` which counts how many numbers are missing up to index `i`. It can be calculated as:  
  `missing(i) = nums[i] - nums - i`  
- Use binary search on the index `i` to find the smallest index where the count of missing numbers reaches or exceeds `k`.  
- Once found, calculate the exact missing number using the previous number in the array and the remaining missing count.  
- Binary search reduces the complexity to O(log n), which is appropriate for large inputs.

### Corner cases to consider  
- If `k` is larger than the total missing numbers within the array bounds, the missing number lies beyond the last array element.  
- Array of size 1.  
- Continuous sequence with no missing numbers (then missing numbers lie beyond the last element).  
- Very large values of missing `k`.  
- Negative or zero values are not part of problem constraints since input array is sorted unique positive integers.

### Solution

```python
def missingElement(nums, k):
    n = len(nums)
    
    # Helper function to count missing numbers until index i
    def missing(i):
        # Numbers missing before nums[i] compared to a continuous sequence from nums[0]
        return nums[i] - nums[0] - i
    
    # If kth missing is greater than total missing in array range, 
    # it must lie beyond the last element
    total_missing = missing(n - 1)
    if k > total_missing:
        return nums[-1] + k - total_missing
    
    left, right = 0, n - 1
    
    # Binary search to find the leftmost index where missing(index) >= k
    while left < right:
        mid = (left + right) // 2
        if missing(mid) >= k:
            right = mid
        else:
            left = mid + 1
    
    # Calculate the k-th missing number using nums[left - 1]
    return nums[left - 1] + k - missing(left - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n) because we use binary search on the sorted array.  
- **Space Complexity:** O(1) as we use only constant extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the array were not sorted?  
  *Hint: Consider sorting first or using a hash set to track missing numbers.*  

- What if you needed to find multiple kᵗʰ missing numbers efficiently?  
  *Hint: Preprocessing prefix sums of missing counts could help.*  

- Can this approach be adapted if duplicates were allowed?  
  *Hint: Think about how missing count calculation changes with duplicates.*

### Summary  
The problem is a classic application of *binary search on the answer space* rather than on the array values directly. Using a helper function to count missing numbers up to a position enables efficient search for the kᵗʰ missing number. This approach can be applied in any scenario where missing or irregular values appear in sorted sequences, helping reduce linear scans to logarithmic time.