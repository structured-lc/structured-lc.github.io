### Leetcode 3491 (Easy): Phone Number Prefix [Practice](https://leetcode.com/problems/phone-number-prefix)

### Description  
Given an array of strings `numbers` representing phone numbers, return **true** if **no phone number is a prefix of another** in the array. Otherwise, return **false**.

A string \( a \) is a **prefix** of \( b \) if the first \( |a| \) characters of \( b \) are exactly \( a \).

### Examples  

**Example 1:**  
Input: `numbers = ["1","2","4","3"]`  
Output: `true`  
Explanation:  
No number is a prefix of any other. Each number is a unique single digit.

**Example 2:**  
Input: `numbers = ["001","007","15","00153"]`  
Output: `false`  
Explanation:  
"001" is a prefix of "00153", so the answer is false.

**Example 3:**  
Input: `numbers = ["12345", "67890", "123", "987654"]`  
Output: `false`  
Explanation:  
"123" is a prefix of "12345".

### Thought Process (as if you’re the interviewee)  

The problem is to ensure that no phone number is a prefix of another.  
Brute-force:  
- Compare every pair of numbers for a prefix, for all i ≠ j.  
- Since there are up to 50 elements, that's O(n² × L) where L = max length.  
- Acceptable for small n, but can be optimized.

Optimized approach:  
- **Sort numbers** lexicographically.  
- Prefixes are likely to be adjacent after sorting.
- After sorting, for each numbers[i], check if numbers[i+1] starts with numbers[i].
- Only need to compare adjacent elements — O(n * L).

Alternative (if constraints larger):  
- Use a **Trie (prefix tree):** 
  - For each number, insert it into the trie.
  - If at any insertion, we find an existing number is already a prefix or the current number is a prefix of an existing one, return false.
  - For this problem, the sorting approach is enough.

### Corner cases to consider  
- All numbers are unique, but one is a prefix (["12", "123"] → false)  
- Numbers have leading zeros ["01", "001"] (tricky if not handled as strings)  
- Single number? (Input constraint: always at least 2 numbers)  
- All identical numbers (["1","1"] → true, since not a prefix, but identical. If identical, not a prefix.)

### Solution

```python
def phone_prefix(numbers):
    # Sort numbers lexicographically
    numbers.sort()
    
    # Check if any number is prefix of the next number in sorted order
    for i in range(len(numbers) - 1):
        prefix = numbers[i]
        next_num = numbers[i+1]
        # If next_num starts with prefix, it's a prefix relationship
        if next_num.startswith(prefix):
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n * L)  
  - Sorting: O(n log n * L) (since comparing strings of length L)
  - Prefix checking: O(n * L)  
  - Since n ≤ 50 and L ≤ 50, very efficient.

- **Space Complexity:**  
  O(1) extra space beyond input (aside from sorting, which may use O(n) for internal sorting storage).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the phone numbers array is very large (millions of numbers)?
  *Hint: How would you reduce memory usage or process entries as they come in?*

- How would you implement this with a Trie and why might that be useful?
  *Hint: Builds prefix relationships efficiently for very large input sizes.*

- What if the numbers are in a database and you must check in real-time if a new phone number is a prefix or has prefix duplicates?
  *Hint: Consider incremental checking and fast lookups while adding numbers.*

### Summary
- **Pattern:** Sorting and comparing adjacent elements for prefix relationship is a standard technique in prefix-based problems.  
- The problem can also be solved with a Trie if constraints grow, but the sorting + linear check is simple and suffices for small arrays.  
- This "prefix check after sorting" pattern appears in other string dictionary and autocomplete problems.