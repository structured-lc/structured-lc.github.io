### Leetcode 1612 (Medium): Check If Two Expression Trees are Equivalent [Practice](https://leetcode.com/problems/check-if-two-expression-trees-are-equivalent)

### Description  
Given the roots of two binary expression trees, where each internal node is '+' and leaves are lowercase variables ('a'-'z'), determine if the two expressions they represent are **equivalent**. Two expressions are equivalent if they can be reordered and grouped to the same multi-set sum — all operations are addition and commutative/associative (order and grouping don't matter).

### Examples  
**Example 1:**  
Input: `root1 = [+,a,+,b,c]`, `root2 = [+,+,b,a,c]`  
Output: `True`  
*Explanation: Both represent a + (b + c) and (a + b) + c, which are equivalent since order/grouping don't matter.*

**Example 2:**  
Input: `root1 = [+,+,a,a,b]`, `root2 = [+,+,b,a,a]`  
Output: `True`  
*Explanation: Both are a + (a + b) and (a + (a + b)), which count two a's and one b.*

**Example 3:**  
Input: `root1 = [+,+,a,b,c]`, `root2 = [+,a,b]`  
Output: `False`  
*Explanation: root1 counts a, b, c; root2 only counts a and b, not equivalent.*

### Thought Process (as if you’re the interviewee)  
Since '+' is **commutative and associative**, the tree structure doesn't impose a unique ordering: as long as the **multiset of all variables** matches, the trees are equivalent. So, I should **count frequency of variables** in each tree and compare.
- I’d traverse each tree (DFS or BFS), counting the occurrences of each variable in a dict or array.
- Compare the two frequency maps: if equal, trees are equivalent.
- It’s important to handle duplicate variables properly!
- Brute-force would try all permutations: but hashing counts is O(n).

### Corner cases to consider  
- One or both trees are just one node.
- Variables appear multiple times on the same or different branches.
- Empty trees (spec not clear: assume always valid trees).
- Variable not in both trees (e.g., root1 has 'a', root2 has 'b').

### Solution

```python
class Solution:
    def checkEquivalence(self, root1: 'Node', root2: 'Node') -> bool:
        # Helper to count variables
        def count_vars(node, freq):
            if node.val == '+':
                count_vars(node.left, freq)
                count_vars(node.right, freq)
            else:
                freq[ord(node.val)-ord('a')] += 1
        freq1 = [0] * 26
        freq2 = [0] * 26
        count_vars(root1, freq1)
        count_vars(root2, freq2)
        return freq1 == freq2
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n is the number of nodes in a tree (need to visit all nodes).
- **Space Complexity:** O(1); uses 26-length arrays for counts and stack space O(height).

### Potential follow-up questions (as if you’re the interviewer)  
- What if the operators included subtraction or multiplication?
  *Hint: Subtraction/multiplication aren’t commutative like addition — revisit order/traversal.*

- How would you handle expressions with parentheses or other grouping?
  *Hint: Parsing may need to preserve order or nesting with non-commutative operations.*

- Could you handle trees with non-variable leaves (e.g., numbers or two-character variables)?
  *Hint: Adjust counting/keying logic.*

### Summary
This is a canonical **tree flattening + counting problem**. We reduce the trees to multisets (variable frequencies) since associative and commutative rules allow any grouping or order. This pattern appears in problems about “canonical form” for trees/expressions.