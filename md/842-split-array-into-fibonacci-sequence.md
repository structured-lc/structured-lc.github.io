### Leetcode 842 (Medium): Split Array into Fibonacci Sequence [Practice](https://leetcode.com/problems/split-array-into-fibonacci-sequence)

### Description  
Given a string `num` consisting of digits, **split** it into a sequence of integers that forms a *Fibonacci-like* sequence:
- A Fibonacci-like sequence is a list `F` where each integer fits into a 32-bit signed integer (0 ≤ F[i] ≤ 2³¹ - 1), F.length ≥ 3, and every subsequent number is the sum of its two previous ones (F[i] + F[i+1] = F[i+2] for all 0 ≤ i < F.length - 2).
- Each number in the sequence must be formed by splitting a non-empty substring of `num`. No number should have leading zeroes **unless** the number is exactly "0".
Return any one valid Fibonacci sequence. If impossible, return an empty list.

### Examples  

**Example 1:**  
Input: `"123456579"`  
Output: `[123,456,579]`  
*Explanation: Splitting "123456579" as 123, 456, and 579 satisfies Fibonacci: 123 + 456 = 579.*

**Example 2:**  
Input: `"11235813"`  
Output: `[1,1,2,3,5,8,13]`  
*Explanation: Split as 1, 1, 2, 3, 5, 8, 13. Each next term is the sum of previous two.*

**Example 3:**  
Input: `"112358130"`  
Output: `[]`  
*Explanation: Can't split so that every next element is the sum of the previous two. No valid Fibonacci-like sequence possible.*

### Thought Process (as if you’re the interviewee)  
My first impulse is brute-force: try every possible way to split the string into numbers, checking the Fibonacci property. However, the constraints of no leading zeroes and max 2³¹-1 value restrict the search space.

A **backtracking** approach fits:
- Try all possible splits for the first and second number (as Fibonacci needs at least two seeds).
- For each pair, try to build the longest possible sequence by continuing, checking if the next number matches the sum.
- Backtrack if stuck or invalid (due to leading zero, overflow, or mismatch).
This prunes impossible paths early and avoids unnecessary work. We also stop if we ever get more than 2³¹-1 for any number.

### Corner cases to consider  
- Input with leading zeroes, e.g. "011235"  
- The number is too large, e.g. "539834657215398346785"  
- Valid sequence uses all digits  
- No valid sequence possible  
- Short strings (< 3 digits), e.g. "12" → should return []  
- Input is "0000" → should return [0,0,0,0] (leading zeros allowed only when the number is 0 itself)

### Solution

```python
def splitIntoFibonacci(num: str):
    # Helper to check and build the sequence with a given split for first two numbers
    def backtrack(start, sequence):
        if start == len(num):
            return len(sequence) >= 3
        
        max_split_len = 10  # max 10 digits for 2^31-1
        curr = 0
        for end in range(start, min(len(num), start + max_split_len)):
            # Skip numbers with leading zero (but allow "0")
            if num[start] == '0' and end > start:
                break
            curr = curr * 10 + int(num[end])
            if curr > 2**31 - 1:
                break
            if len(sequence) >= 2:
                next_expected = sequence[-1] + sequence[-2]
                if curr < next_expected:
                    continue
                elif curr > next_expected:
                    break
            sequence.append(curr)
            if backtrack(end + 1, sequence):
                return True
            sequence.pop()
        return False

    for i in range(1, min(11, len(num))):  # 1st number
        for j in range(i+1, min(i+11, len(num))):  # 2nd number
            if (num[0] == '0' and i > 1) or (num[i] == '0' and j > i+1):
                continue  # Leading zeros
            first = int(num[:i])
            second = int(num[i:j])
            if first > 2**31-1 or second > 2**31-1:
                continue
            seq = [first, second]
            if backtrack(j, seq):
                return seq
    return []
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L³), where L is the length of `num`. We try up to 10 digits for first and second number (since 2³¹-1 is 10 digits), so at most 10 × 10 = 100 starting pairs. For each, the recursion explores splits down the string, and at each recursive call, we could potentially split at up to O(L) remaining positions. Thus, the total is O(L³), but in practice much lower due to early pruning.
- **Space Complexity:** O(L), from recursion stack (at most depth L), and the space for storing current sequence.

### Potential follow-up questions (as if you’re the interviewer)  

- What if numbers could exceed the 2³¹-1 limit?  
  *Hint: How would you handle arbitrarily large numbers without integer overflow errors?*

- Can you return all possible valid Fibonacci-like sequences in the string?  
  *Hint: Instead of stopping at the first success, continue exploring all splits.*

- What if the Fibonacci rule is modified, say, each next number is the sum of previous k numbers (k-ary Fibonacci)?  
  *Hint: Generalize your recursion for variable-length sequence rules.*

### Summary
This problem uses the classic **backtracking** and **DFS with pruning** pattern: try and build a solution incrementally, revert when impossible, and use ruling-out constraints to minimize useless computation. Similar approaches are needed for permutation, combination, subsequence, and partitioning problems in strings and arrays. Backtracking solutions also naturally handle variants and constraints that arise in related interview problems.


### Flashcard
Try all splits for first two numbers, then backtrack to build Fibonacci sequence; if sequence uses all digits and length ≥ 3, return it.

### Tags
String(#string), Backtracking(#backtracking)

### Similar Problems
- Additive Number(additive-number) (Medium)
- Fibonacci Number(fibonacci-number) (Easy)