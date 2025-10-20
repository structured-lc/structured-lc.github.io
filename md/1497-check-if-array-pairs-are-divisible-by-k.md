### Leetcode 1497 (Medium): Check If Array Pairs Are Divisible by k [Practice](https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k)

### Description  
Given an array of integers and an integer k, determine if the array can be paired up (every element belongs to exactly one pair) such that the sum of every pair is divisible by k.

### Examples  
**Example 1:**  
Input: `arr = [1,2,3,4,5,10,6,7,8,9], k = 5`  
Output: `True`  
*Explanation: The array can be paired as (1,9), (2,8), (3,7), (4,6), (5,10), all of which sum to 10, which is divisible by 5.*

**Example 2:**  
Input: `arr = [1,2,3,4,5,6], k = 7`  
Output: `True`  
*Explanation: Possible pairs: (1,6), (2,5), (3,4); each sums to 7.*

**Example 3:**  
Input: `arr = [1,2,3,4,5,6], k = 10`  
Output: `False`  
*Explanation: No way to pair all elements so that sum is divisible by 10.*


### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to try all pairings, but this is too slow.
- Key observation: For sum (a+b) to be divisible by k, the remainders mod k must sum to k (or 0 if both are 0).
- Count frequency of each remainder. For each r, need same number of k−r (mod k) remainders to form valid pairs.
- For remainder 0, count must be even.
- For remainders i and k−i (i≠0, k even: i≠k/2), ensure their counts match.
- Only iterate from 1 to k//2 to check pairs.
- This observation reduces time complexity to linear.


### Corner cases to consider  
- Array size not even.
- k == 1.
- Negative numbers: (handle modulo for negatives)
- All elements are multiples of k.
- Remainders are 0 or k/2.


### Solution

```python
from collections import Counter

def canArrange(arr, k):
    if len(arr) % 2 != 0:
        return False
    count = Counter([x % k for x in arr])
    for rem in range(k):
        opp = (k - rem) % k
        if rem == 0 or (k % 2 == 0 and rem == k // 2):
            if count[rem] % 2 != 0:
                return False
        else:
            if count[rem] != count[opp]:
                return False
    return True
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n + k); O(n) for initial count, O(k) for checking pairs.
- **Space Complexity:** O(k) for remainder counts.


### Potential follow-up questions (as if you’re the interviewer)  
- How does your logic change if array can have odd number of elements?  
  *Hint: Pairing is only possible for even-size arrays.*
- What if instead of pairing all, want to maximize number of divisible pairs?  
  *Hint: Use min(count[r], count[k−r]).*
- Can you do it in-place without extra storage?  
  *Hint: Tricky because need frequency counts.*

### Summary
This is a classic application of counting using mod arithmetic, related to the Two Sum and group-by-remainder pattern. Useful for other divisor, modulo, or complement group problems.


### Flashcard
Count frequency of each remainder mod k; for each r, need same count of k−r (or r=0: even count); check all pairs to ensure valid pairing.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
- Count Array Pairs Divisible by K(count-array-pairs-divisible-by-k) (Hard)
- Minimum Deletions to Make Array Divisible(minimum-deletions-to-make-array-divisible) (Hard)
- Count Pairs That Form a Complete Day II(count-pairs-that-form-a-complete-day-ii) (Medium)
- Count Pairs That Form a Complete Day I(count-pairs-that-form-a-complete-day-i) (Easy)