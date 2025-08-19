### Leetcode 1946 (Medium): Largest Number After Mutating Substring [Practice](https://leetcode.com/problems/largest-number-after-mutating-substring)

### Description  
You are given a string **num** representing a non-negative integer and an integer array **change** of length 10. Each index of **change** represents a digit (0–9), and the value is the digit you can swap it to.  
You may mutate **at most one** contiguous substring of **num** (possibly empty or the whole string) by replacing each digit `d` in the substring with **change[d]**.  
Your goal is to choose the best possible substring to mutate, and return the largest possible number as a string after this mutation.

### Examples  

**Example 1:**  
Input: `num = "132", change = [9,8,5,0,3,6,4,2,6,8]`  
Output: `"832"`  
*Explanation: Start mutating from index 0: "1"→"8", "3"→"3", "2"→"2". The largest number forms by mutating the first digit and stopping after you can't increase further.*

**Example 2:**  
Input: `num = "021", change = [9,4,3,5,7,2,4,8,6,1]`  
Output: `"934"`  
*Explanation: Mutate the whole string: "0"→"9", "2"→"3", "1"→"4". All digits increase, so mutate all.*

**Example 3:**  
Input: `num = "5", change = [1,4,7,5,3,2,5,6,9,4]`  
Output: `"5"`  
*Explanation: Mutating would not create a larger digit: "5"→"2" (less), so don’t mutate at all. Output is unchanged.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every possible substring, apply the mutation, and compare results. But with length n, this gives O(n²) substrings, which is inefficient.
- **Greedy approach:**  
  - To maximize the number, try to mutate from the leftmost digit where mutating makes it **greater** (i.e., change[d] > d).
  - Continue mutating as long as mutating does **not decrease** the digit (i.e., change[d] ≥ d).
  - Stop as soon as you find a digit where mutating would make it **smaller**; after that, no more mutation is allowed.
  - This ensures the longest possible high-value replacement sequence from the left.
- This works because mutating any earlier substring that doesn't start at the leftmost increasing point would not yield a larger number.

### Corner cases to consider  
- All digits already maximal or cannot be increased (e.g., change[d] ≤ d for all d).
- Only one or zero digits.
- Mutating decreases any digit (should not mutate).
- The best choice is to mutate a single digit or the entire string.
- The best is not to mutate at all.
- Leading zeros after mutation (not possible due to constraint, since replacement does not introduce new leading zeros).

### Solution

```python
def maximumNumber(num: str, change: list[int]) -> str:
    # Convert input string to list for easy mutation
    num_list = list(num)
    n = len(num_list)
    mutated = False
    
    i = 0
    while i < n:
        digit = int(num_list[i])
        mapped = change[digit]
        
        # Start mutating if mapping increases the digit
        if not mutated and mapped > digit:
            # Begin mutation: keep mutating as long as possible
            while i < n and change[int(num_list[i])] >= int(num_list[i]):
                num_list[i] = str(change[int(num_list[i])])
                i += 1
            mutated = True  # Only one contiguous mutation allowed
            break
        i += 1
    # After breaking, fill unchanged tail
    return ''.join(num_list)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each digit is visited at most twice: once for starting mutation, and inside the inner loop for sequence mutation.
- **Space Complexity:** O(n).  
  Need array to hold the mutated number (same as input size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could mutate **multiple, non-overlapping** substrings?  
  *Hint: Think about marking maximal non-decreasing blocks where mutation increases value.*

- What if you could mutate **arbitrary (not necessarily contiguous) digits**?  
  *Hint: Would replacing all digits where change[d] > d always be optimal?*

- Suppose that the mapping is not guaranteed to be non-decreasing (i.e., change might *not* satisfy change[d] ≥ d)?  
  *Hint: Need to decide for each position whether the gain justifies mutation or if leaving it as-is is better.*

### Summary
This is a **greedy single-pass substring mutation** problem, with a direct scan and maximal contiguous block approach. The "one-shot contiguous maximize" greedy methodology is standard for substring mutation/flip/intervention problems, and can be adapted to bit flipping and other one-block transform settings. The main pattern is **greedy left-to-right expansion based on partial gain, stop on first drop**.

### Tags
Array(#array), String(#string), Greedy(#greedy)

### Similar Problems
