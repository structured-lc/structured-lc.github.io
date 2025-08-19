### Leetcode 1985 (Medium): Find the Kth Largest Integer in the Array [Practice](https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array)

### Description  
Given an array `nums` of string representations of non-negative integers (no leading zeros), and an integer `k`, return the `k`ᵗʰ largest number in the array **by its numeric value** (not lexicographical order). If there are duplicates, treat each one as a distinct entry. The result should be returned as a string.

### Examples  

**Example 1:**  
Input: `nums = ["3","6","7","10"]`, `k = 4`  
Output: `"3"`  
*Explanation: The numbers by value in descending order: 10, 7, 6, 3. The 4ᵗʰ largest is `"3"`.*

**Example 2:**  
Input: `nums = ["2","21","12","1"]`, `k = 3`  
Output: `"2"`  
*Explanation: Sorted numerically descending: 21, 12, 2, 1. The 3ʳᵈ largest is `"2"`.*

**Example 3:**  
Input: `nums = ["0","0"]`, `k = 2`  
Output: `"0"`  
*Explanation: The numbers are 0, 0. The 2ⁿᵈ largest is still `"0"`.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Convert all strings to integers, sort them descending, and return the kᵗʰ largest converted back to string. However, the constraints allow `nums[i]` to be very large (up to 100 digits), so converting to int may be slow or error-prone for big numbers.
- **Optimization:**  
  Since strings don't have leading zeros, we can compare their numeric values by:
    - First comparing by length: longer strings mean greater numbers.
    - If lengths are equal, compare lexicographically.
  Thus, sort the strings using this custom comparison logic, then return the kᵗʰ largest.
- **Alternative:**  
  We could use a heap of size `k` (min-heap) to keep the top k largest strings by custom numeric comparison, for better efficiency if the array is very large.
- I would code the sort-based solution for clarity, but mention heap for follow-up if n is very large.

### Corner cases to consider  
- All numbers are zeros, e.g., `["0", "0", "0"]`.
- Multiple elements with the same value.
- One element array: `["123"]`, k = 1.
- Very large numbers with many digits.
- k equals array length or k = 1.
- Already sorted or reverse-sorted input.

### Solution

```python
def findKthLargestNumber(nums, k):
    # Custom comparison logic not needed in Python when sorting with key
    # Since numbers are strings with no leading zeros, compare by length and then lexicographically
    
    # Sort nums by length (descending: longer is bigger), then lexicographically (descending)
    def cmp_key(x):
        return (len(x), x)
    
    # Sort the list according to numeric value in ascending order
    nums.sort(key=cmp_key)
    
    # The kᵗʰ largest is the (len(nums)-k)ᵗʰ smallest in ascending order
    return nums[-k]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m + n log n), where n = len(nums), m = average length of a string.
    - Sorting all n strings takes O(n log n) comparisons, and each comparison is up to O(m) because string length/lexicographical comparison scans each character.
- **Space Complexity:** O(n × m) for storing the sorted array and string copies (input + sorting overhead). No extra major space except sorting.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if `nums` has millions of entries and k is small?  
  *Hint: Use a heap (priority queue) to keep the k largest elements seen so far. This reduces memory and avoids full sort.*

- Can you do it in O(n) average time instead of O(n log n)?  
  *Hint: Use Quickselect (Divide and Conquer) on strings with custom comparison logic.*

- What changes if you need to return all top k largest numbers?  
  *Hint: Return the last k elements of the sorted array, or push to heap and pop k times.*

### Summary
This problem is a classic example of **custom sort/pq by numeric value using string properties**, avoiding conversion to integer for huge values. The pattern used—**string comparison by (length, lexicographical)** for large-number handling—applies to any large-number or "big integer" problems (e.g., highest-value string, custom numeric priority queues). It's also relevant for building k-largest or k-smallest string-based heaps.

### Tags
Array(#array), String(#string), Divide and Conquer(#divide-and-conquer), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Quickselect(#quickselect)

### Similar Problems
- Kth Largest Element in an Array(kth-largest-element-in-an-array) (Medium)