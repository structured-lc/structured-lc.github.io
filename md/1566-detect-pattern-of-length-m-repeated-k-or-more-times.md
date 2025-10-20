### Leetcode 1566 (Easy): Detect Pattern of Length M Repeated K or More Times [Practice](https://leetcode.com/problems/detect-pattern-of-length-m-repeated-k-or-more-times)

### Description  
Given an integer array and two integers m and k, check if there is a subarray (contiguous elements) of length m that repeats itself consecutively k or more times somewhere in the array. The repeating pattern cannot overlap, and the pattern must be exactly the same for each repetition. Return True if such a pattern exists, otherwise False.

### Examples  

**Example 1:**  
Input: `arr = [1,2,4,4,4,4], m = 1, k = 3`  
Output: `True`  
*Explanation: The number 4 repeats 4 times consecutively. A pattern of length 1 (just [4]) is repeated k=3 times (indices 2,3,4).*

**Example 2:**  
Input: `arr = [1,2,1,2,1,1,1,3], m = 2, k = 2`  
Output: `True`  
*Explanation: The pattern [1,2] repeats twice consecutively (indices 0-1 and 2-3).*

**Example 3:**  
Input: `arr = [1,2,3,1,2], m = 2, k = 2`  
Output: `False`  
*Explanation: There is no length-2 subarray that repeats consecutively two or more times.*


### Thought Process (as if you’re the interviewee)  
- I'd start by brute force: for every possible starting index, try to match m elements and see if the following m elements are the same, and repeat this k times consecutively. This leads to nested loops and is not very efficient.
- We can optimize by leveraging the fact that if arr[i] == arr[i-m], we can count how many times this holds consecutively. If we reach m × (k-1) consecutive matches, then we've found a pattern of length m repeated k times.
- The core invariant is: for each i ≥ m, if arr[i] == arr[i-m], increment a count; when the count reaches m × (k-1), return True.


### Corner cases to consider  
- arr shorter than m × k: Impossible to have k consecutive patterns.
- m = 1: Single elements repeated.
- k = 1: Any subarray of length m would be trivially valid (may need to clarify with interviewer).
- arr consists of only one value.
- arr includes negative or 0 values.


### Solution

```python
# We'll count consecutive matches between arr[i] and arr[i-m].
# If we get enough matches, it means the pattern repeats k times.

def containsPattern(arr, m, k):
    count = 0
    for i in range(m, len(arr)):
        if arr[i] == arr[i - m]:
            count += 1
        else:
            count = 0
        if count == m * (k - 1):
            return True
    return False
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n is the length of arr. We loop through arr once.
- **Space Complexity:** O(1). Only constant extra space for the count variable.


### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to find the starting index and the pattern as well?  
  *Hint: You’d need to track index where count started, and slice arr.*

- Can you modify the code to handle overlapping patterns?  
  *Hint: Adjust the check so patterns can overlap and count accordingly.*

- Can you solve this using KMP or other pattern matching algorithms?  
  *Hint: Consider sliding window or string pattern techniques.*

### Summary
This problem demonstrates a clever use of a running counter to recognize repeated sequences within an array by comparing elements separated by m positions. The pattern is related to the sliding window and frequency counting techniques. This approach is also applicable to substring and subarray repetition detection in both strings and arrays.


### Flashcard
For each index i, check if arr[i] == arr[i+m] for m×(k-1) consecutive positions; maintains counter that resets on mismatch.

### Tags
Array(#array), Enumeration(#enumeration)

### Similar Problems
- Maximum Repeating Substring(maximum-repeating-substring) (Easy)