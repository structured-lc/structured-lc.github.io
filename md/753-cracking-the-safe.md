### Leetcode 753 (Hard): Cracking the Safe [Practice](https://leetcode.com/problems/cracking-the-safe)

### Description  
You have a safe with a password that is a sequence of **n** digits, where each digit can be any integer from **0** to **k−1**. When a user types a sequence of digits, the safe checks every time whether the most recent **n** digits equal its password; if this happens at any time, the safe unlocks. Your task is to generate the shortest string of digits such that, as the sequence is entered, every possible combination of **n** digits (from 0 to k−1) will appear as a consecutive substring somewhere in the entered string. Return any such string of minimal length.

### Examples  

**Example 1:**  
Input: `n = 2, k = 2`  
Output: `"00110"`  
*Explanation: All possible 2-digit combinations are "00", "01", "11", "10". Starting with "00", moving to "01", then "11", and finally "10". The string "00110" covers all combinations.*

**Example 2:**  
Input: `n = 1, k = 2`  
Output: `"01"`  
*Explanation: Possible passwords are "0" and "1". "01" contains both as substrings.*

**Example 3:**  
Input: `n = 2, k = 3`  
Output: `"0021122021"`  
*Explanation: All 2-digit combinations from 0-2: "00", "01", "02", "10", "11", "12", "20", "21", "22" are all present as substrings.*

### Thought Process (as if you’re the interviewee)  
This is a "de Bruijn sequence" problem. The goal is to cover every possible combination of n-length codes with as few digits as possible, such that each n-length window covers a unique password exactly once. A brute-force approach would try all possible strings, which is extremely inefficient since there are kⁿ possible passwords, and naive enumeration yields very long strings.

A better solution is to use Hierholzer's algorithm to construct an Eulerian circuit in a de Bruijn graph:  
- Nodes: All possible (n-1)-digit strings (because appending a new digit gives an n-length password).
- Edges: Directed edges representing adding a new digit to the window, forming a new node.
- Walk through each edge exactly once, appending the last digit.

We perform a DFS, keeping track of visited edges so that each password is in the string exactly once.

**Trade-offs**:
- This approach is efficient and generates a string of length kⁿ + n - 1, which is minimal.
- Additional memory needed to track visited edges.

### Corner cases to consider  
- n = 1 (just return a string containing all digits 0..k−1)
- k = 1 (the only valid digit is "0", so the answer should be a string of n zeros)
- Empty or zero values for n or k (invalid by problem statement)
- Leading zeros, which are necessary when n > 1

### Solution

```python
def crackSafe(n: int, k: int) -> str:
    seen = set()
    ans = []
    
    # Start node: n-1 zeros
    start = '0' * (n - 1)
    
    def dfs(node):
        # Try every digit for the next position
        for x in map(str, range(k)):
            neighbor = node + x
            if neighbor not in seen:
                seen.add(neighbor)
                dfs(neighbor[1:])
                ans.append(x)
    
    dfs(start)
    # Append the starting prefix to "close the circle"
    return start + ''.join(ans[::-1])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(kⁿ), since there are kⁿ unique passwords, and we traverse each once in constructing the de Bruijn sequence.
- **Space Complexity:** O(kⁿ), space for the visited set and the answer string, which are both proportional to the number of unique passwords.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of digits, the password could be any character from a custom set?
  *Hint: Consider mapping the characters to indices or use a general alphabet.*

- How would you generate all distinct de Bruijn sequences for given n, k?
  *Hint: Think about different starting nodes or traversal orders.*

- How do you modify the algorithm to return all possible minimal-length strings, if there could be more than one?
  *Hint: Enumerate all Eulerian circuits or use backtracking with result collection.*

### Summary
This problem is a classic example of generating de Bruijn sequences, using Hierholzer's algorithm for Eulerian circuits. The key insight is modeling the sequence coverage as traveling edges in a de Bruijn graph to systematically cover all possible n-length substrings efficiently. This approach often appears in combinatorial generation, string reconstruction, and cryptographic settings.