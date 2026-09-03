import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
// output: "export"（静的出力）ではビルド時に1回だけ生成する必要があるため明示する
export const dynamic = "force-static";

// public/images/profile.png を円形に切り抜いてファビコンにする。
// next/og の ImageResponse はビルド時にHTML/CSSを画像へ焼き込むため、
// 画像処理ライブラリを別途インストールせずに円形クロップができる。
export default async function Icon() {
    const buffer = fs.readFileSync(
        path.join(process.cwd(), "public/images/profile.png")
    );
    const dataUrl = `data:image/png;base64,${buffer.toString("base64")}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    borderRadius: "50%",
                    overflow: "hidden",
                }}>
                <img
                    src={dataUrl}
                    alt=''
                    width={size.width}
                    height={size.height}
                    style={{ objectFit: "cover" }}
                />
            </div>
        ),
        { ...size }
    );
}
