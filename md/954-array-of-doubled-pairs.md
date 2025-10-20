### Leetcode 954 (Medium): Array of Doubled Pairs [Practice](https://leetcode.com/problems/array-of-doubled-pairs)

### Description  
Given an array of integers, determine if it can be reordered so that every element x can be paired with another element y such that y = 2 × x. Each element must be used exactly once in creating these pairs. Explain how you would check if such a reordering is possible.

### Examples  

**Example 1:**  
Input: `[3, 1, 3, 6]`  
Output: `False`  
*Explanation: It's impossible to pair 3 with any value such that another value in the array is 2 × 3 = 6, since after pairing 6, there's still a 3 left unpaired.*

**Example 2:**  
Input: `[2, 4, 0, 0, 8, 1]`  
Output: `False`  
*Explanation: Although 2, 4, and 8 can pair as (2,4),(4,8), the two zeros need to be paired together as (0,0). But if there were an odd number of 0's, it wouldn't work. Here, 1 cannot be paired with 2.*

**Example 3:**  
Input: `[4, -2, 2, -4]`  
Output: `True`  
*Explanation: After sorting by absolute value we get [-4, -2, 2, 4]. We can pair -4 with -2 (since -2 = 2×-4) and 2 with 4 (4 = 2×2). All elements are used exactly once.*

### Thought Process (as if you’re the interviewee)  
Start by thinking through brute-force: For each element, try to find another element that is exactly double it. That would be O(n²), which is too slow for large lists.

A better method is to count the frequency of each number. You can pair elements from the smallest absolute value to the largest since negative and positive numbers could be present, and pairing must work in both directions. 

Sort the numbers by absolute value. This is important because if we pair a number before its double, we avoid accidentally using up doubles needed elsewhere. For each number x, try to pair it with 2×x using the stored counts. If at any point there are more x than 2×x, return False. Special care is needed for zeros: there must be an even number for them to be paired with each other.

The sorted+count approach is efficient and avoids pitfalls with negatives or zeros.

### Corner cases to consider  
- Empty array: Should return True, as no pairs are needed.
- Odd number of zeros: Cannot split into zero pairs.
- Negatives: E.g., pairing -2 and -4 should work.
- Duplicates: E.g., multiple 2's, multiple 4's.
- Single element: Cannot be paired.
- Very large or small (positive/negative) numbers.

### Solution

```python
def canReorderDoubled(arr):
    # Count occurrences of each value
    freq = {}
    for num in arr:
        freq[num] = freq.get(num, 0) + 1

    # Sort the keys by absolute value to pair correctly
    for x in sorted(freq.keys(), key=abs):
        # If there aren't enough 2×x to pair, fail
        if freq.get(2 * x, 0) < freq[x]:
            return False
        # Decrement the number of 2×x, using up pairs
        freq[2 * x] = freq.get(2 * x, 0) - freq[x]
        
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) — Sorting the array by absolute value dominates; everything else is linear.
- **Space Complexity:** O(n) — For storing frequencies of all elements.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where you want to pair x with 3×x or any k×x?  
  *Hint: Generalize the pairing logic; sort and count appropriately for k.*

- Could you do this without sorting?  
  *Hint: Think about why sorting by absolute value is important for correct pairing in presence of negative numbers.*

- What changes if you only care about positive pairs, ignoring negative values?  
  *Hint: You can skip negatives, or treat positive and negative numbers separately.*

### Summary
The core approach uses frequency maps and absolute value sorting to pair elements with their doubles efficiently. This *count-and-greedy pairing* pattern is commonly used for problems involving pairing (or grouping) based on specific ratios or multiples and is easily adapted for similar constraints like k-difference or k-ratio pairs.


### Flashcard
Count frequency; sort by abs value, for each x, if count[x] > 0 and count[2x] ≥ count[x], pair and decrement counts.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Find Original Array From Doubled Array(find-original-array-from-doubled-array) (Medium)