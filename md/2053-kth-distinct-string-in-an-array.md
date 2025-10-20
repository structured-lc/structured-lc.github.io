### Leetcode 2053 (Easy): Kth Distinct String in an Array [Practice](https://leetcode.com/problems/kth-distinct-string-in-an-array)

### Description  
Given an array of strings, return the kᵗʰ string that is **distinct** (appears only once) in the order they first appear. If there are fewer than k distinct strings, return the empty string "".  
Example interview explanation:  
"Given a list of strings, a 'distinct' string is one that appears exactly once in the array. Return the kᵗʰ such string as it appears from left to right. If there aren't k, return ''."  

### Examples  

**Example 1:**  
Input: `arr = ["d","b","c","b","c","a"], k = 2`  
Output: `a`  
*Explanation: The distinct strings are "d" and "a". The 2ⁿᵈ is "a".*

**Example 2:**  
Input: `arr = ["aaa","aa","a"], k = 1`  
Output: `aaa`  
*Explanation: All strings are distinct since each appears once. The 1ˢᵗ is "aaa".*

**Example 3:**  
Input: `arr = ["a","b","a"], k = 3`  
Output: ``  
*Explanation: Only "b" is distinct. There are not 3 distinct strings, so return an empty string.*

### Thought Process (as if you’re the interviewee)  
I would start by understanding what "distinct" means in the context: it’s any string that appears exactly once in the array.  
My brute-force approach would be:
- For each string, count how many times it appears (O(n²) with nested loops).
- Iterate through the original array, collect strings that appear once, and return the kᵗʰ one.

To optimize, I’d use a hash map (dictionary) to count occurrences in one pass (O(n)), and then in a second pass over the array, select the kᵗʰ string with a count exactly one.  
This preserves order and guarantees efficiency, trading O(n) space for speed—better than double loops.  
Since order matters, a counter based purely on set values wouldn’t work; I need the *first* k distinct in order.

### Corner cases to consider  
- Array is empty ⇒ should return `""`  
- k is 0 or negative ⇒ should return `""`  
- k > number of distinct strings ⇒ should return `""`  
- All elements are the same ⇒ only one (or no) distinct string  
- Array with just 1 string and k = 1 ⇒ returns that string  
- Multiple elements but none are distinct (all repeated)  
- Strings with different cases ("A" vs "a")  

### Solution

```python
def kth_distinct(arr, k):
    # First count occurrences of each string
    count = {}
    for s in arr:
        if s in count:
            count[s] += 1
        else:
            count[s] = 1

    # Now find the kᵗʰ distinct string in original order
    for s in arr:
        if count[s] == 1:
            k -= 1
            if k == 0:
                return s

    # If there are less than k distinct strings
    return ""
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of strings.  
  (First pass: count all n; second pass: iterate all n.)
- **Space Complexity:** O(n), for the extra hashmap storing counts (in worst case, all unique).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array is very large and cannot fit in memory?  
  *Hint: Could you use streaming approaches or external storage?*

- How would you handle extremely long or non-ASCII strings?  
  *Hint: Consider unicode, normalization, and memory efficiency.*

- What if we needed to return all k distinct strings, not just the kᵗʰ?  
  *Hint: Collect them in a list as you process, and return up to k elements.*

### Summary
This approach uses the **hashing + two-pass selection** pattern:  
Count item frequencies, then in another pass, select the kᵗʰ item that fits a criterion (here, "distinct").  
It’s a commonly used trick for "frequency in array" problems and shows up in favorites like "First Unique Character", "Top K Frequent", etc.  
Efficient, order-preserving, and easy to reason about.


### Flashcard
Use a hash map to count string occurrences in one pass, then select the kth distinct string.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Count Common Words With One Occurrence(count-common-words-with-one-occurrence) (Easy)