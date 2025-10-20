### Leetcode 1980 (Medium): Find Unique Binary String [Practice](https://leetcode.com/problems/find-unique-binary-string)

### Description  
You are given an array of unique binary strings, all of the same length `n`. Your task is to return **any** binary string of length `n` that **does not appear** in the input array. The input array is guaranteed to have `n` strings, but there are 2ⁿ possible binary strings of length `n`, so at least one valid answer always exists.

### Examples  

Input=`nums = ["01","10"]`  
Output=`"11"`  
Explanation: The input contains "01" and "10". Valid missing binary strings (of length 2) include "00" and "11". "11" is returned as the answer here.

Input=`nums = ["00","01"]`  
Output=`"10"`  
Explanation: The input has "00" and "01". Possible missing strings are "10" and "11". "10" is returned.

Input=`nums = ["1"]`  
Output=`"0"`  
Explanation: The input has only "1". The missing string (of length 1) is "0", which is returned as the answer.

### Thought Process (as if you’re the interviewee)  
**Brute-force:** Generate all possible binary strings of length n, and return the first one not present in `nums`. This is guaranteed to find a solution, but is inefficient for larger n, as there are 2ⁿ candidates.

**Optimization:** Notice that, while the total number of possible strings is 2ⁿ, there are only n input strings. We can exploit the structure: for the iᵗʰ position in the string (0 ≤ i < n), we can simply choose a bit that differs from the iᵗʰ bit of the iᵗʰ string in `nums`. This constructs a new string that is guaranteed to differ from each input string in at least one position, hence must be unique.

This approach runs in O(n²) time (O(n) for each string to build the result, and for each string we need to examine up to n bits). But since n is small, this is feasible and avoids the exponential enumeration of brute-force.

**Trade-offs:** The brute-force approach is clear but impractical for large n. The optimized approach is both simple and efficient, leveraging the pigeonhole principle—with n+1 possible strings, there’s always at least one not in the array.

### Corner cases to consider  
- **n = 1:** Only two possible strings, "0" and "1". If one is present, the other is the answer.
- **All 0s or all 1s:** If the input contains all strings starting with 0 or 1, make sure the strategy still works (it does, by varying the iᵗʰ bit).
- **Empty array:** Per the problem, nums always has n elements; but hypothetically, if empty, any binary string of length 0 is valid.
- **Arrays with maximum n strings:** Even if all 2ⁿ-1 strings are present, our approach still returns a valid missing string.

### Solution  
```python
def find_unique_binary_string(nums):
    n = len(nums)
    result = []
    # For each position i, pick a bit different from nums[i][i]
    for i in range(n):
        # Flip the i-th bit of the i-th string
        # '0' becomes '1'; '1' becomes '0'
        bit = '1' if nums[i][i] == '0' else '0'
        result.append(bit)
    return ''.join(result)
```
**Logic:** For each position i, look at the iᵗʰ character of the iᵗʰ string in nums. Flip that bit to get the iᵗʰ bit of your answer. This guarantees the new string differs from every string in nums in at least one position.

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²): For each of the n bits, we access a character in a string of length n.
- **Space Complexity:** O(1) for extra space beyond the output string, or O(n) including output, as we build a string of length n.

### Potential follow-up questions  
How would you modify your solution if you need to return all possible missing binary strings?  
Hint: Think how to enumerate all valid candidates—use backtracking or bitmask enumeration. Start small, with n=2 or n=3, to avoid blowup.

What if the input could have up to 2ⁿ-1 strings (instead of n)?  
Hint: You can no longer guarantee a quick answer by just flipping one bit per position. How would you adapt your strategy?

If we wanted the lexicographically smallest missing string, how would you adapt your approach?  
Hint: This shifts the problem to a lex order traversal of all binary strings, checking membership in nums. Can you optimize it?

### Summary  
This problem uses a smart bit-flipping strategy (pigeonhole principle) to guarantee a unique solution efficiently. The pattern is a simple constructive approach, common in problems requiring constructing a counterexample. Similar constructive logic appears in problems that require you to find something guaranteed to exist due to the constraints (e.g., missing numbers, impossible configurations). The approach is both time- and space-efficient, avoiding brute-force enumeration.


### Flashcard
Construct a binary string by flipping the iᵗʰ bit of the iᵗʰ string (diagonal argument) to guarantee uniqueness.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Backtracking(#backtracking)

### Similar Problems
- Missing Number(missing-number) (Easy)
- Find All Numbers Disappeared in an Array(find-all-numbers-disappeared-in-an-array) (Easy)
- Random Pick with Blacklist(random-pick-with-blacklist) (Hard)