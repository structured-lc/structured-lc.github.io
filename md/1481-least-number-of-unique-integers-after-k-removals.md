### Leetcode 1481 (Medium): Least Number of Unique Integers after K Removals [Practice](https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals)

### Description  
Given an integer array `arr` and an integer k, remove exactly k elements from the array so that the number of **unique integers** left is minimized. You can remove any k elements (not just unique elements).

### Examples  
**Example 1:**  
Input: `arr = [5,5,4]`, `k = 1`  
Output: `1`  
*Explanation: Remove one 5, leaves [5,4] (2 unique), but best is to remove 4, leaving [5,5] (1 unique).*  

**Example 2:**  
Input: `arr = [4,3,1,1,3,3,2]`, `k = 3`  
Output: `2`  
*Explanation: Remove two 1's and one 2; left with [4,3,3,3], unique are 3,4.*

**Example 3:**  
Input: `arr = [1]`, `k = 1`  
Output: `0`  
*Explanation: Remove 1, no integers left, so 0 unique.*

### Thought Process (as if you’re the interviewee)  
- Brute force: Try all possible k deletions, but not feasible.
- Greedy approach: Focus on removing the numbers with the **lowest frequency** first because removing a unique integer completely requires removing all its occurrences, costing less the fewer it appears.
- Count frequencies, sort numbers by their frequency, remove occurrences starting from the lowest frequency, decrement k accordingly.
- Track how many unique numbers remain after k deletions.

### Corner cases to consider  
- k = 0 (no removals)
- k larger than total elements (should not happen per constraints)
- arr of all same number
- arr of all unique numbers
- k exactly removes all occurrences of some numbers

### Solution
```python
from collections import Counter

def find_least_num_of_unique_ints(arr, k):
    count = Counter(arr)
    freq = sorted(count.values())
    unique = len(freq)
    for f in freq:
        if k >= f:
            k -= f
            unique -= 1
        else:
            break
    return unique
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n), mainly for sorting the frequencies.
- **Space Complexity:** O(n), for count and intermediate lists.

### Potential follow-up questions (as if you’re the interviewer)  
- How can you optimize if n is huge?
  *Hint: Use a min-heap instead of sorting all frequencies if needed.*
- What happens if k is larger than array size?
  *Hint: It will remove all, so answer is 0.*
- Can you reconstruct the final array after removals?
  *Hint: Track which elements are deleted first; reconstruct accordingly.*

### Summary
This is a classic greedy + frequency-counting problem. The key is to always remove the least costly-to-remove unique integers first for minimal uniqueness, a pattern found in several removal/minimization scenarios involving counts or resources.


### Flashcard
Count frequencies, sort by frequency, and greedily remove numbers with lowest frequency first until k removals are used; remaining unique numbers is the answer.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Sorting(#sorting), Counting(#counting)

### Similar Problems
- Maximum Number of Distinct Elements After Operations(maximum-number-of-distinct-elements-after-operations) (Medium)