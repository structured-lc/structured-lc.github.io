### Leetcode 3467 (Easy): Transform Array by Parity [Practice](https://leetcode.com/problems/transform-array-by-parity)

### Description  
Given an integer array, replace every even number with 0 and every odd number with 1. Then, sort the resulting array in non-decreasing order. Return the final array.
In other words, transform each value in the array by its parity — 0 if even, 1 if odd — and return the sorted result.

### Examples  

**Example 1:**  
Input: `[4,3,2,1]`  
Output: `[0,0,1,1]`  
*Explanation: 4 and 2 are even → 0; 3 and 1 are odd → 1. So we get `[0,1,0,1]`, sort gives `[0,0,1,1]`.*

**Example 2:**  
Input: `[7,8,7,6]`  
Output: `[0,0,1,1]`  
*Explanation: 8 and 6 are even → 0; 7 appears twice and is odd → 1. So `[1,0,1,0]`, sort is `[0,0,1,1]`.*

**Example 3:**  
Input: `[5,5,5]`  
Output: `[1,1,1]`  
*Explanation: All odd values become 1, so `[1,1,1]`. Sorting doesn’t change order.*

### Thought Process (as if you’re the interviewee)  
Start with a brute-force approach by converting every element:  
- Loop through the array and for each element, if it’s even, change it to 0; if odd, change to 1.
- After this, sort the transformed array and return it.

But since the array after transformation only contains 0s and 1s, sorting isn’t necessary.  
- We count the number of 0s (even) and 1s (odd), and construct a new array: first all 0s, then all 1s.
- This works because for an array with `k` zeros and `n-k` ones, the sorted order is `*k + [1]*(n-k)`.

**Why this is optimal:**
- Instead of sorting, we can count, which is O(n) time and O(1) extra (for counts) plus output array.
- Simpler, avoids unnecessary sort method.

### Corner cases to consider  
- Empty array → should return empty array.
- All numbers even → output is all zeroes, already sorted.
- All numbers odd → output is all ones, already sorted.
- Single element → returns  or [1] depending on parity.
- Mix of even/odd, unordered.
- Negative numbers: −2 is even, −1 is odd (parity defined as n % 2).
- Large arrays.

### Solution

```python
def transformArray(nums):
    # Count the number of even (0s) and odd (1s) elements
    count_even = 0
    count_odd = 0
    
    for num in nums:
        if num % 2 == 0:
            count_even += 1
        else:
            count_odd += 1

    # Build array: all 0s (even), then all 1s (odd)
    return [0] * count_even + [1] * count_odd
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the array. One pass to count each type; array construction is O(n).
- **Space Complexity:** O(n) for the result array. Only a few integer counters used for counting.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this problem **in-place** (i.e., without using extra space for output)?
  *Hint: Could use two pointers or overwrite in the original array.*

- What if, instead of only 0/1, you had to group elements by **remainder when divided by k**?
  *Hint: Use counting sort generalization.*

- Can this be done in a **single pass** if sorting is allowed (not optimal, but practical)?
  *Hint: Transform and sort at once, then return.*

### Summary
This problem uses a *counting sort* idea (since only two values, 0 and 1, are possible after transformation). This pattern is useful whenever you need to group or count discrete values then output in grouped order, such as the Dutch National Flag and counting sort for limited-value arrays. Recognizing special value constraints can avoid unnecessary sorting.

### Tags
Array(#array), Sorting(#sorting), Counting(#counting)

### Similar Problems
- Odd Even Linked List(odd-even-linked-list) (Medium)