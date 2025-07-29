### Leetcode 3253 (Medium): Construct String with Minimum Cost (Easy) [Practice](https://leetcode.com/problems/construct-string-with-minimum-cost-easy)

### Description  
Given a target string, a list of words, and a list of associated costs (one per word), you start with an empty string. At any time, you can append any word from the list to your current string, paying its associated cost. The goal is to construct the target string with the minimum total cost. If it can't be done, return -1.  
Think of it as assembling the target from left to right, each time possibly appending any word (at any position) as long as you eventually get the exact target.

### Examples  

**Example 1:**  
Input: `target = "abcdef", words = ["abdef","abc","d","def","ef"], costs = [100,1,1,10,5]`  
Output: `7`  
*Explanation: Use "abc" (cost 1), then "d" (cost 1), then "ef" (cost 5). Total: 1 + 1 + 5 = 7.*

**Example 2:**  
Input: `target = "hello", words = ["h","e","l","o"], costs = [1,1,1,1]`  
Output: `5`  
*Explanation: Use each letter: "h" (1), "e" (1), "l" (1 two times), "o" (1). 1 + 1 + 1 + 1 + 1 = 5.*

**Example 3:**  
Input: `target = "aabb", words = ["a","ab","b"], costs = [1,4,2]`  
Output: `4`  
*Explanation: "a" (1), "ab" (4), but it's cheaper to do "a" (1), "a" (1), "b" (2): 1 + 1 + 2 = 4.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Try all possible ways of forming target by successively adding words at each possible position—this is exponential and not feasible for long strings.
- **Optimization:** Use dynamic programming, where dp[i] is the minimum cost needed to build target[i:]. Trie and memoization can speed up word prefix checks.
- For each starting index, try every word that matches the prefix at that location and recursively compute the minimal cost for the rest of the string. Store intermediate results to avoid re-computation ("memoization").
- Using a Trie allows us to efficiently match all word prefixes starting from any character in target.
- Final approach is: preprocess Trie with words and their min costs, then use top-down DP with memoization to traverse target. If no match is found at any step, result is -1.

### Corner cases to consider  
- Empty target string (should return 0).
- No possible way to assemble target (result is -1).
- Duplicates in words with different costs—always choose minimal cost for any given word.
- Words that can overlap in constructing, but do not fit in correct order.
- target shorter than any word, or target requiring repeated word use.

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.cost = float('inf')

class Solution:
    def minimumCost(self, target, words, costs):
        # Build Trie from words, record minimal cost for each word
        root = TrieNode()
        for word, cost in zip(words, costs):
            node = root
            for c in word:
                if c not in node.children:
                    node.children[c] = TrieNode()
                node = node.children[c]
            node.cost = min(node.cost, cost)
        
        n = len(target)
        memo = {}

        def dp(i):
            if i == n:
                return 0
            if i in memo:
                return memo[i]
            node = root
            min_cost = float('inf')
            j = i
            while j < n:
                c = target[j]
                if c not in node.children:
                    break
                node = node.children[c]
                if node.cost != float('inf'):
                    right = dp(j + 1)
                    if right != float('inf'):
                        min_cost = min(min_cost, node.cost + right)
                j += 1
            memo[i] = min_cost
            return min_cost

        res = dp(0)
        return res if res != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m × L + n²), where m is the number of words, L is the average length of words, and n is the length of target.
  - Trie build: O(m × L)
  - DP: At worst O(n²) calls (since each index checks up to n in the while loop).
- **Space Complexity:**  
  O(n + T), where n is the memo array size (DP), and T is the total number of Trie nodes (up to m × L).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the words array is huge or has many duplicates?  
  *Hint: Preprocess words to keep only lowest cost per unique word before Trie construction.*

- If reuse of words is not allowed, how would your approach change?  
  *Hint: DP transitions would need to track used words, possibly via a bitmap or extra state.*

- How would you solve it if costs depended on position in target or previous selections?  
  *Hint: The DP state would need to encode more, such as position or selection history.*

### Summary
This problem uses the **dynamic programming with Trie** pattern, a variant of "word break" with word cost minimization. It's a classic use case for Trie prefix matching combined with DP memoization for optimal substructure and overlapping subproblems. This approach generalizes to any "construct by concatenation" + "minimal cost" questions, such as word segmentation, sentence assembly, and minimal cost composition problems.